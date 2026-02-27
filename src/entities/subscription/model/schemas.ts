import z from 'zod'

export const subscriptionCreateValidationSchema = z.object({
  endpoint: z.string(),
  expirationTime: z.number().nullable().optional(),
  keys: z.object({
    auth: z.string(),
    p256dh: z.string(),
  }),
})
