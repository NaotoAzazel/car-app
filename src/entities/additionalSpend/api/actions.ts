'use server'

import { CreateAdditionalSpendSchema } from '@/entities/record'
import { db } from '@/shared/lib'

export const createAdditionalSpend = async (
  spend: CreateAdditionalSpendSchema,
) => {
  return await db.additionalSpend.create({ data: spend })
}

export const linkSpendToRecord = async (spendId: number, recordId: number) => {
  return await db.recordToAdditionalSpend.create({
    data: {
      recordId: recordId,
      additionalSpendId: spendId,
    },
  })
}
