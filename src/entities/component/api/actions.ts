'use server'

import { Component, Prisma } from '@prisma/client'

import { db } from '@/shared/lib'

export async function createComponent(component: Omit<Component, 'id'>) {
  return await db.component.create({ data: component })
}

export async function deleteComponentById(id: Component['id']) {
  await db.recordsToComponents.deleteMany({
    where: { componentId: id },
  })
  return await db.component.delete({ where: { id } })
}

export async function getComponents() {
  return await db.component.findMany()
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

  const totalItems = await db.component.count({
    where: whereClause,
  })

  const components = await db.component.findMany({
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
