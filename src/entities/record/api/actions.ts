'use server'

import { Records } from '@prisma/client'

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
    },
  })
}

export async function getRecordTypes() {
  const recordTypes = await db.recordTypes.findMany()
  return recordTypes
}

export async function updateRecordById(
  id: number,
  record: UpdateRecordRequest,
) {
  const { recordTypeId, recordType, components, id: recordId, ...rest } = record

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
    },
  })
}
