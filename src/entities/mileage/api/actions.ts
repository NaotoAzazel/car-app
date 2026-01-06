'use server'

import { Mileage, Prisma } from '@prisma/client'
import { endOfDay, startOfMonth } from 'date-fns'

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

export async function getMileageByDateRange(from: Date, to: Date) {
  return await db.mileage.findMany({
    where: {
      createdAt: {
        gte: from,
        lte: endOfDay(to),
      },
    },
  })
}

export async function getLastMileageMonthRange() {
  const lastRecord = await db.mileage.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    take: 1,
  })

  if (!lastRecord) {
    throw new Error('No records found')
  }

  return {
    from: startOfMonth(lastRecord.createdAt),
    to: lastRecord.createdAt,
  }
}

export async function deleteMileageById(id: Mileage['id']) {
  return await db.mileage.delete({ where: { id } })
}
