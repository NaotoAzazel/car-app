import z from 'zod'

export const recordTypeValidationsSchema = z.object({
  name: z
    .string({ message: 'Обязательное поле' })
    .min(1, { message: 'Минимальная длинна 1 символ' })
    .max(128, { message: 'Максимальная длинна 128 символов' }),
})

export const createRecordTypeFormSchema = recordTypeValidationsSchema

export type CreateRecordTypeFormSchema = z.infer<
  typeof createRecordTypeFormSchema
>
