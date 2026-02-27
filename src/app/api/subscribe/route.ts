import { NextResponse } from 'next/server'

import {
  createSubscription,
  subscriptionCreateValidationSchema,
} from '@/entities/subscription'

export async function POST(req: Request) {
  try {
    const subscription = await req.json()
    const { keys, endpoint } =
      subscriptionCreateValidationSchema.parse(subscription)

    await createSubscription({
      auth: keys.auth,
      endpoint: endpoint,
      p256dh: keys.p256dh,
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.log('Subscribe API POST error:', e)
    return NextResponse.json(
      { message: 'FAILED_TO_SUBSCRIBE' },
      { status: 400 },
    )
  }
}
