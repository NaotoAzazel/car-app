'use server'

import { Prisma, Records } from '@prisma/client'

import { db } from '@/shared/lib'

import { CreateRecordRequest, UpdateRecordRequest } from '../model'

export async function createRecord(record: CreateRecordRequest) {
  const { recordTypeId, recordType, ...rest } = record

  return await db.records.create({
    data: { ...rest, RecordsComponents: { create: [] } },
  })
}

export async function getRecordById(id: Records['id']) {
  return await db.records.findFirst({
    where: { id },
    include: {
      recordType: true,
      RecordsComponents: {
        include: {
          component: true,
        },
      },
      TagsComponents: {
        include: {
          tag: true,
        },
      },
    },
  })
}

interface GetRecordsForPaginationParams {
  title?: string
  page: number
  itemsPerPage: number
  includeTags?: boolean
  includeComponents?: boolean
  includeTypes?: boolean
}

export async function getRecordsForPagination({
  page,
  itemsPerPage,
  title,
  includeTags = false,
  includeComponents = false,
  includeTypes = false,
}: GetRecordsForPaginationParams) {
  const skip = (page - 1) * itemsPerPage

  const whereClause = {
    title: {
      contains: title,
      mode: Prisma.QueryMode.insensitive,
    },
  }

  const include: Prisma.RecordsFindManyArgs['include'] = {}

  if (includeTypes) {
    include.recordType = true
  }

  if (includeComponents) {
    include.RecordsComponents = {
      include: {
        component: true,
      },
    }
  }

  if (includeTags) {
    include.TagsComponents = {
      include: {
        tag: true,
      },
    }
  }

  const totalItems = await db.records.count({
    where: whereClause,
  })

  const records = await db.records.findMany({
    where: whereClause,
    take: itemsPerPage,
    skip,
    include: {
      recordType: true,
      RecordsComponents: {
        include: {
          component: true,
        },
      },
      TagsComponents: {
        include: {
          tag: true,
        },
      },
    },
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

export async function getRecordTypes() {
  const recordTypes = await db.recordTypes.findMany()
  return recordTypes
}

export async function updateRecordById(
  id: number,
  record: UpdateRecordRequest,
) {
  const {
    recordTypeId,
    recordType,
    components,
    tags,
    id: recordId,
    ...rest
  } = record

  await db.records.update({
    where: { id },
    data: {
      ...rest,
      recordType: recordTypeId
        ? { connect: { id: recordTypeId } }
        : { disconnect: true },

      RecordsComponents: {
        deleteMany: {},
        create: components?.map((c) => ({
          component: {
            connect: { id: c.componentId },
          },
        })),
      },

      TagsComponents: {
        deleteMany: {},
        create: tags?.map((t) => ({
          tag: {
            connect: { id: t.tagId },
          },
        })),
      },
    },
  })
}

export async function deleteRecordById(id: Records['id']) {
  await db.recordsComponents.deleteMany({
    where: { recordId: id },
  })
  await db.records.delete({ where: { id } })
}

export async function getTotalSpends() {
  // dont touch this please never!
  const result = await db.$queryRaw<{ total: number }[]>`
    SELECT
      (
        COALESCE(SUM(c.cost), 0) +
        COALESCE(SUM((spend->>'cost')::int), 0)
      )::int AS total
    FROM "Records" r
    LEFT JOIN "RecordsComponents" rc ON rc."recordId" = r.id
    LEFT JOIN "Components" c ON c.id = rc."componentId"
    LEFT JOIN LATERAL jsonb_array_elements(r."additionalSpends") spend ON true
  `
  return result[0].total
}

export async function getSpendsByMonthYear(month: number, year: number) {
  if (month < 0 || month > 11) {
    throw new Error('The month must be within the range 0–11')
  }

  const dbMonth = month + 1
  const result = await db.$queryRaw<{ total: number }[]>`
    SELECT
      (
        COALESCE(SUM(c.cost), 0) +
        COALESCE(SUM((spend->>'cost')::int), 0)
      )::int AS total
    FROM "Records" r
    LEFT JOIN "RecordsComponents" rc ON rc."recordId" = r.id
    LEFT JOIN "Components" c ON c.id = rc."componentId"
    LEFT JOIN LATERAL jsonb_array_elements(r."additionalSpends") spend ON true
    WHERE EXTRACT(MONTH FROM r."createdAt") = ${dbMonth}
      AND EXTRACT(YEAR FROM r."createdAt") = ${year}
  `

  return result[0]?.total ?? 0
}

export async function getSpendsByYear(year: number) {
  const result = await db.$queryRaw<{ total: number }[]>`
    SELECT
      (
        COALESCE(SUM(c.cost), 0) +
        COALESCE(SUM((spend->>'cost')::int), 0)
      )::int AS total
    FROM "Records" r
    LEFT JOIN "RecordsComponents" rc ON rc."recordId" = r.id
    LEFT JOIN "Components" c ON c.id = rc."componentId"
    LEFT JOIN LATERAL jsonb_array_elements(r."additionalSpends") spend ON true
    WHERE EXTRACT(YEAR FROM r."createdAt") = ${year}
  `
  return result[0].total ?? 0
}

export async function getRecordsCountByMonth(month: number) {
  if (month < 0 || month > 11) {
    throw new Error('The month must be within the range 0–11')
  }

  const currentYear = new Date().getFullYear()

  const startDate = new Date(currentYear, month, 1, 0, 0, 0)
  const endDate = new Date(currentYear, month + 1, 1, 0, 0, 0)

  const count = await db.records.count({
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
  const months = await db.records.findMany({
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
