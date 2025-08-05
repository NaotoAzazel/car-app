import '@prisma/client'

type AdditionalSpendItem = {
  id: number
  name: string
  cost: number
}

declare global {
  namespace PrismaJson {
    type AdditionalSpends = AdditionalSpendItem[]
  }
}
