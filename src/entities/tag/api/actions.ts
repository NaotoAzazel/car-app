'use server'

import { Prisma } from '@prisma/client'

import { db } from '@/shared/lib'

interface GetTagsForPaginationParams {
  name?: string
  page: number
  itemsPerPage: number
}

export async function getTagsForPagination({
  page,
  itemsPerPage,
  name,
}: GetTagsForPaginationParams) {
  const skip = (page - 1) * itemsPerPage

  const whereClause = {
    name: {
      contains: name,
      mode: Prisma.QueryMode.insensitive,
    },
  }

  const totalItems = await db.tags.count({
    where: whereClause,
  })

  const tags = await db.tags.findMany({
    where: whereClause,
    take: itemsPerPage,
    skip,
  })

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return {
    data: tags,
    metadata: {
      totalPages,
      totalItems,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  }
}
