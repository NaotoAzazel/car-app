import { env } from '@/env'
import webpush from 'web-push'

let isConfigured = false

export function getWebPush() {
  if (!isConfigured) {
    webpush.setVapidDetails(
      'mailto:your@email.com',
      env.NEXT_PUBLIC_VAPID_KEY,
      env.VAPID_PRIVATE_KEY,
    )

    isConfigured = true
  }

  return webpush
}
