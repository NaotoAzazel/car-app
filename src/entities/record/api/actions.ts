'use server'

import { Prisma, Record, RecordTags } from '@prisma/client'

import { db } from '@/shared/lib'

import { CreateRecordRequest, UpdateRecordRequest } from '../model'

export async function createRecord(record: CreateRecordRequest) {
  return await db.record.create({ data: record })
}

interface GetRecordByIdOptions {
  includeComponents?: boolean
  includeType?: boolean
  includeAdditionalSpends?: boolean
}

export async function getRecordById(
  id: Record['id'],
  options?: GetRecordByIdOptions,
) {
  return await db.record.findFirst({
    where: { id },
    include: {
      recordType: options?.includeType,
      recordsToComponents: options?.includeComponents
        ? {
            include: {
              component: true,
            },
          }
        : false,
      recordToAdditionalSpends: options?.includeAdditionalSpends
        ? {
            include: {
              additionalSpend: true,
            },
          }
        : false,
    },
  })
}

export async function getRecordTypes() {
  return await db.recordType.findMany()
}

interface GetRecordsForPaginationParams {
  title?: string
  page: number
  itemsPerPage: number
  includeRecordType?: boolean
}

export async function getRecordsForPagination({
  page,
  itemsPerPage,
  title,
  includeRecordType = false,
}: GetRecordsForPaginationParams) {
  const skip = (page - 1) * itemsPerPage

  const whereClause = {
    title: {
      contains: title,
      mode: Prisma.QueryMode.insensitive,
    },
  }

  const include = Prisma.validator<Prisma.RecordInclude>()({
    recordType: includeRecordType,
    recordsToComponents: {
      // TODO: fix this later, always include components, even when not needed
      include: {
        component: true,
      },
    },
    recordToAdditionalSpends: {
      include: {
        additionalSpend: true,
      },
    },
  })

  const totalItems = await db.record.count({
    where: whereClause,
  })

  const records = await db.record.findMany({
    where: whereClause,
    take: itemsPerPage,
    skip,
    include,
  })

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return {
    data: records,
    metadata: {
      totalPages,
      totalItems,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  }
}

export async function updateRecordById(record: UpdateRecordRequest) {
  const { recordsToComponents, id: _, ...mainData } = record

  return await db.record.update({
    where: { id: record.id },
    data: {
      ...mainData,

      recordsToComponents: {
        deleteMany: {},
        create: recordsToComponents?.map((rtc) => ({
          component: {
            connect: { id: rtc.componentId },
          },
        })),
      },

      recordToAdditionalSpends: {
        deleteMany: {},
        create:
          record.recordToAdditionalSpends?.map((spend) => ({
            additionalSpend: {
              connect: { id: spend.additionalSpendId },
            },
          })) ?? [],
      },
    },
  })
}

export async function deleteRecordById(id: Record['id']) {
  return await db.$transaction(async (tx) => {
    await tx.recordsToComponents.deleteMany({
      where: { recordId: id },
    })

    const deletedRecord = await tx.record.delete({
      where: { id },
    })

    return deletedRecord
  })
}

export async function getTotalSpends() {
  const result = await db.$queryRaw<{ total: number }[]>`
    SELECT (
      (
        SELECT COALESCE(SUM(c.cost), 0)
        FROM "RecordsToComponents" rc
        JOIN "Component" c ON c.id = rc."componentId"
      ) +
      (
        SELECT COALESCE(SUM(s.cost), 0)
        FROM "RecordToAdditionalSpend" ras
        JOIN "AdditionalSpend" s ON s.id = ras."additionalSpendId"
      )
    )::int AS total
  `

  return result[0]?.total ?? 0
}

export async function getSpendsByMonthYear(month: number, year: number) {
  if (month < 0 || month > 11) {
    throw new Error('The month must be within the range 0–11')
  }

  const dbMonth = month + 1

  const result = await db.$queryRaw<{ total: number }[]>`
  WITH RELEVANT_RECORDS AS (
    SELECT id
    FROM "Record"
    WHERE EXTRACT(MONTH FROM "createdAt") = ${dbMonth}
      AND EXTRACT(YEAR FROM "createdAt") = ${year}
  ),
  COMPONENTS_SUM AS (
    SELECT COALESCE(SUM(c.cost), 0) as cost_sum
    FROM "RecordsToComponents" rc
    JOIN "Component" c ON c.id = rc."componentId"
    WHERE rc."recordId" IN (SELECT id FROM RELEVANT_RECORDS)
  ),
  SPENDS_SUM AS (
    SELECT COALESCE(SUM(s.cost), 0) as additional_sum
    FROM "RecordToAdditionalSpend" ras
    JOIN "AdditionalSpend" s ON s.id = ras."additionalSpendId"
    WHERE ras."recordId" IN (SELECT id FROM RELEVANT_RECORDS)
  )
  SELECT (COMPONENTS_SUM.cost_sum + SPENDS_SUM.additional_sum)::int AS total
  FROM COMPONENTS_SUM, SPENDS_SUM
`

  return result[0]?.total ?? 0
}

export async function getSpendsByYear(year: number) {
  const result = await db.$queryRaw<{ total: number }[]>`
  SELECT (
    COALESCE((
      SELECT SUM(c.cost)
      FROM "RecordsToComponents" rc
      JOIN "Component" c ON c.id = rc."componentId"
      JOIN "Record" r ON r.id = rc."recordId"
      WHERE EXTRACT(YEAR FROM r."createdAt") = ${year}
    ), 0) 
    + 
    COALESCE((
      SELECT SUM(s.cost)
      FROM "RecordToAdditionalSpend" ras
      JOIN "AdditionalSpend" s ON s.id = ras."additionalSpendId"
      JOIN "Record" r ON r.id = ras."recordId"
      WHERE EXTRACT(YEAR FROM r."createdAt") = ${year}
    ), 0)
  )::int AS total
`

  return result[0]?.total ?? 0
}

export async function getRecordsCountByMonth(month: number) {
  if (month < 0 || month > 11) {
    throw new Error('The month must be within the range 0–11')
  }

  const currentYear = new Date().getFullYear()

  const startDate = new Date(currentYear, month, 1, 0, 0, 0)
  const endDate = new Date(currentYear, month + 1, 1, 0, 0, 0)

  const count = await db.record.count({
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
  })

  return count
}

export async function avgSpendsInMonth() {
  const months = await db.record.findMany({
    select: {
      createdAt: true,
    },
  })

  const uniqueMonths = new Set(
    months.map(
      (record) =>
        `${record.createdAt.getFullYear()}-${record.createdAt.getMonth() + 1}`,
    ),
  )

  const totalSpends = await getTotalSpends()

  return totalSpends / uniqueMonths.size
}

export async function getMonthsSpendsByYear(year: number) {
  const rawData = await db.$queryRaw<{ month: number; spend: number }[]>`
    SELECT 
      month,
      SUM(component_sum + additional_sum)::int AS spend
    FROM (
      SELECT 
        r.id,
        EXTRACT(MONTH FROM (r."createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Kiev'))::int AS month,
        COALESCE((
          SELECT SUM(c.cost)
          FROM "RecordsToComponents" rc
          JOIN "Component" c ON c.id = rc."componentId"
          WHERE rc."recordId" = r.id
        ), 0) AS component_sum,
        COALESCE((
          SELECT SUM(s.cost)
          FROM "RecordToAdditionalSpend" ras
          JOIN "AdditionalSpend" s ON s.id = ras."additionalSpendId"
          WHERE ras."recordId" = r.id
        ), 0) AS additional_sum
      FROM "Record" r
      WHERE EXTRACT(YEAR FROM (r."createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Kiev')) = ${year}
    ) t
    GROUP BY month
    ORDER BY month
  `

  const monthMap = new Map<number, number>()
  rawData.forEach((row) => {
    monthMap.set(row.month, Number(row.spend))
  })

  return Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    spend: monthMap.get(i + 1) ?? 0,
  }))
}

export async function getYears() {
  const years = await db.$queryRaw<{ year: number }[]>`
    SELECT DISTINCT EXTRACT(YEAR FROM "createdAt")::int AS year
    FROM "Record"
    ORDER BY year;
  `

  const uniqueYears = [...new Set(years.map((r) => r.year))]
  return uniqueYears
}

export async function getLastYearWithData() {
  const lastRecord = await db.record.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      createdAt: true,
    },
  })

  if (!lastRecord) return null

  return lastRecord.createdAt.getFullYear().toString()
}

export async function getLatestRecordByTag(tag: RecordTags) {
  return await db.record.findMany({
    where: { tags: { has: tag } },
    take: 1,
    orderBy: {
      mileage: 'desc',
    },
    select: {
      mileage: true,
    },
  })
}
