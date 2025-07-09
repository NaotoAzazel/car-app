'use server'

import { Records } from '@prisma/client'

import { db } from '@/shared/lib'

import { UpdateRecordRequest } from '../model'

export type CreateRecordParam = Omit<Records, 'id' | 'updatedAt'>

export async function createRecord(record: CreateRecordParam) {
  return await db.records.create({
    data: { ...record, RecordsComponents: { create: [] } },
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
