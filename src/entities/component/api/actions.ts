'use server'

import { db } from '@/shared/lib'

export async function getComponents() {
  return await db.components.findMany()
}
