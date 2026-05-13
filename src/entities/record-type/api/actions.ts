'use server'

import { db } from '@/shared/lib'

export async function createRecordType(name: string) {
  return await db.recordType.create({
    data: {
      name,
    },
  })
}
