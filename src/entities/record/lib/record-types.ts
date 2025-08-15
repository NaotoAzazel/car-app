import { RecordTypes } from '@prisma/client'

export const recordTypesRu = {
  [RecordTypes.BUYING]: 'Покупка',
  [RecordTypes.INSURANCE]: 'Страховка',
  [RecordTypes.REPAIRING]: 'Ремонт',
  [RecordTypes.SERVICING]: 'Обслуживание',
  [RecordTypes.TUNING]: 'Тюнинг, апгрейды',
} as const

export type RecordTypesRuKeys = keyof typeof recordTypesRu
