'use server'

import { Records } from '@prisma/client'

import { db } from '@/shared/lib'

export type CreateRecordParam = Omit<Records, 'id' | 'createdAt' | 'updatedAt'>

export async function createRecord(record: CreateRecordParam) {
  const createdRecord = await db.records.create({ data: record })
  return createdRecord
}
