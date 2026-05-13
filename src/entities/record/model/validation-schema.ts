import { RecordTags } from '@prisma/client'
import { z } from 'zod'

const TITLE_MIN_LENGTH = 1
const TITLE_MAX_LENGTH = 128

const MILEAGE_MIN_LENGTH = 0

const ADDITIONAL_SPEND_COST_MIN_VALUE = 1
const ADDITIONAL_SPEND_COST_MAX_VALUE = 2_000_000_000

const titleValidation = {
  title: z
    .string({ message: 'Обязательное поле' })
    .min(TITLE_MIN_LENGTH, {
      message: `Минимальная длинна ${TITLE_MIN_LENGTH} символ`,
    })
    .max(TITLE_MAX_LENGTH, {
      message: `Максимальная длинна ${TITLE_MAX_LENGTH} символов`,
    }),
}

export const createRecordFormSchema = z.object(titleValidation)

export type CreateRecordFormSchema = z.infer<typeof createRecordFormSchema>

const componentsSchema = z.object({
  componentId: z.number(),
  recordId: z.number(),
  component: z.object({
    id: z.number(),
    name: z.string(),
    cost: z.number(),
    isLiquid: z.boolean(),
    code: z.string(),
  }),
})

export type ComponentsSchema = z.infer<typeof componentsSchema>

export const additionalSpend = z.object({
  id: z.number(),
  name: z.string().min(1),
  cost: z.coerce
    .number()
    .min(ADDITIONAL_SPEND_COST_MIN_VALUE, 'Цена должна быть неотрицательной')
    .max(
      ADDITIONAL_SPEND_COST_MAX_VALUE,
      `Цена не должна превышать ${ADDITIONAL_SPEND_COST_MAX_VALUE}`,
    ),
})

const createAdditionalSpendSchema = additionalSpend.omit({ id: true })

export type CreateAdditionalSpendSchema = z.infer<
  typeof createAdditionalSpendSchema
>

export const additionalSpendsSchema = z.object({
  additionalSpendId: z.number(),
  recordId: z.number(),
  additionalSpend,
})

export type AdditionalSpendSchema = z.infer<typeof additionalSpend>

export const recordSchema = z.object({
  ...titleValidation,
  mileage: z
    .number()
    .min(
      MILEAGE_MIN_LENGTH,
      `Пробег не может быть меньше ${MILEAGE_MIN_LENGTH}`,
    ),
  recordTypeId: z.number().nullable(),
  createdAt: z.date(),
  recordsToComponents: z.array(componentsSchema),
  recordToAdditionalSpends: z.array(additionalSpendsSchema),
  tags: z.array(z.nativeEnum(RecordTags)),
})

export type RecordSchema = z.infer<typeof recordSchema>

export const createRecordSchema = recordSchema.omit({
  recordsToComponents: true,
  recordToAdditionalSpends: true,
})
export type CreateRecordRequest = z.infer<typeof createRecordSchema>

export const updateRecordSchema = recordSchema.partial().extend({
  id: z.number(),
})

export type UpdateRecordRequest = z.infer<typeof updateRecordSchema>
