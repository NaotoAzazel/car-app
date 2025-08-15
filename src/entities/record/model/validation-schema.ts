import { RecordTypes } from '@prisma/client'
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
  }),
})

export type ComponentsSchema = z.infer<typeof componentsSchema>

const tagsSchema = z.object({
  recordId: z.number(),
  tagId: z.number(),
  tag: z.object({
    id: z.number(),
    name: z.string(),
  }),
})

export type TagsSchema = z.infer<typeof tagsSchema>

export const additionalSpendsSchema = z.object({
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

export type AdditionalSpendsSchema = z.infer<typeof additionalSpendsSchema>

export const recordSchema = z.object({
  ...titleValidation,
  mileage: z
    .number()
    .min(
      MILEAGE_MIN_LENGTH,
      `Пробег не может быть меньше ${MILEAGE_MIN_LENGTH}`,
    ),
  recordType: z.nativeEnum(RecordTypes).nullable(),
  createdAt: z.date(),
  components: z.array(componentsSchema),
  tags: z.array(tagsSchema),
  additionalSpends: z.array(additionalSpendsSchema),
})

export type RecordSchema = z.infer<typeof recordSchema>

export const createRecordSchema = recordSchema.omit({
  components: true,
  tags: true,
})
export type CreateRecordRequest = z.infer<typeof createRecordSchema>

export const updateRecordSchema = recordSchema.partial().extend({
  id: z.number(),
})

export type UpdateRecordRequest = z.infer<typeof updateRecordSchema>
