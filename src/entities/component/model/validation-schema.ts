import { z } from 'zod'

const NAME_MIN_LENGTH = 1
const NAME_MAX_LENGTH = 128

const COST_MIN_VALUE = 1
const COST_MAX_VALUE = 2_000_000_000

const REQUIRED_FIELD = 'Обязательное поле'

export const createComponentSchema = z.object({
  name: z
    .string({ message: REQUIRED_FIELD })
    .min(NAME_MIN_LENGTH, {
      message: `Минимальная длинна ${NAME_MIN_LENGTH} символ`,
    })
    .max(NAME_MAX_LENGTH, {
      message: `Максимальная длинна ${NAME_MAX_LENGTH} символов`,
    }),
  cost: z
    .union([
      z.coerce
        .number()
        .min(COST_MIN_VALUE, 'Цена должна быть неотрицательной')
        .max(COST_MAX_VALUE, `Цена не должна превышать ${COST_MAX_VALUE}`),
      z.literal(''),
    ])
    .refine((val) => val === '' || typeof val === 'number', {
      message: 'Введите корректную цену',
    }),
  isLiquid: z.boolean({ message: REQUIRED_FIELD }),
  code: z.string(),
})

export type CreateComponentSchema = z.infer<typeof createComponentSchema>
