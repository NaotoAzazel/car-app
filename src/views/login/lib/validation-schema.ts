import z from 'zod'

const PASSWORD_MIN_LENGTH = 1
const PASSWORD_MAX_LENGTH = 128

const REQUIRED_FIELD = 'Обязательное поле'

export const loginSchema = z.object({
  password: z
    .string({ message: REQUIRED_FIELD })
    .min(PASSWORD_MIN_LENGTH)
    .max(PASSWORD_MAX_LENGTH),
})

export type LoginSchema = z.infer<typeof loginSchema>
