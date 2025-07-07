import { z } from 'zod'

const TITLE_MIN_LENGTH = 1
const TITLE_MAX_LENGTH = 128

const MILEAGE_MIN_LENGTH = 0

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

export const createRecordSchema = z.object(titleValidation)

export type CreateRecordSchema = z.infer<typeof createRecordSchema>

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
})

export type RecordSchema = z.infer<typeof recordSchema>
