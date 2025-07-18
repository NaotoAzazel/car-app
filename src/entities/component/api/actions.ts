'use server'

import { Prisma } from '@prisma/client'

import { db } from '@/shared/lib'

export async function getComponents() {
  return await db.components.findMany()
}

interface getComponentsForPaginationParams {
  name?: string
  page: number
  itemsPerPage: number
}

export async function getComponentsForPagination({
  page,
  itemsPerPage,
  name,
}: getComponentsForPaginationParams) {
  const skip = (page - 1) * itemsPerPage

  const whereClause = {
    name: {
      contains: name,
      mode: Prisma.QueryMode.insensitive,
    },
  }

  const totalItems = await db.components.count({
    where: whereClause,
  })

  const components = await db.components.findMany({
    where: whereClause,
    take: itemsPerPage,
    skip,
  })

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return {
    data: components,
    metadata: {
      totalPages,
      totalItems,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  }
}
