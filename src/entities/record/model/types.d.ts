import { Components, RecordsComponents } from '@prisma/client'

export type RecordsComponentWithData = RecordsComponents & {
  component: Components
}
