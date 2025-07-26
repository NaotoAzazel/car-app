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
