import { NextResponse } from 'next/server'

import { getSubscriptions } from '@/entities/subscription'
import { getWebPush } from '@/shared/lib'

export async function POST() {
  try {
    // TODO: validate session

    const webpush = getWebPush()

    const subscriptions = await getSubscriptions()

    if (!subscriptions.length) {
      return NextResponse.json({ message: 'NO_SUBSCRIPTIONS' })
    }

    const payload = JSON.stringify({
      type: 'BLUETOOTH_DISCONNECT',
      title: 'Записать пробег',
      body: 'Нажмите чтобы записать пробег',
      url: '/?mileage-dialog=true',
      timestamp: Date.now(),
    })

    await Promise.all(
      subscriptions.map((sub) => {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        }

        return webpush
          .sendNotification(pushSubscription, payload)
          .catch(async (err) => {
            console.error('PUSH_ERROR:', err)
          })
      }),
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
