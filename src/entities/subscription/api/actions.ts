'use server'

import { PushSubscription } from '@prisma/client'

import { db } from '@/shared/lib'

export async function getSubscriptions() {
  return await db.pushSubscription.findMany()
}

export async function createSubscription(
  subscription: Omit<PushSubscription, 'id'>,
) {
  return await db.pushSubscription.upsert({
    where: {
      endpoint: subscription.endpoint,
    },
    update: { ...subscription },
    create: subscription,
  })
}
