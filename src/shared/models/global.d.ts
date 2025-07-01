import '@prisma/client'

import { Component } from './component'

type CategoryId = number

declare global {
  namespace PrismaJson {
    type Components = Component[]
    type Categories = CategoryId[]
  }
}
