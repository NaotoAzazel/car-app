'use server'

import { Mileage, Prisma } from '@prisma/client'

import { db } from '@/shared/lib'

export async function createMileage(mileage: Mileage['mileage']) {
  const latestMileage = await getLatestMileage()
  if (latestMileage.length && mileage < latestMileage[0].mileage) {
    throw new Error('The new mileage cannot be less than previous')
  }

  return await db.mileage.create({ data: { mileage } })
}

interface GetLatestMileageParams {
  where?: Prisma.MileageWhereInput
}

export async function getLatestMileage({ where }: GetLatestMileageParams = {}) {
  return await db.mileage.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
    take: 1,
  })
}
