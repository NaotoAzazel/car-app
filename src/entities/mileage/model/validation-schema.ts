import z from 'zod'

const MILEAGE_MIN_VALUE = 1
const MILEAGE_MAX_VALUE = 2_000_000_000

export const createMileageSchema = z.object({
  mileage: z
    .number()
    .min(MILEAGE_MIN_VALUE, 'Пробег должен быть неотрицательным')
    .max(MILEAGE_MAX_VALUE, `Пробег не должен превышать ${MILEAGE_MAX_VALUE}`),
})

export type CreateMileageSchema = z.infer<typeof createMileageSchema>
