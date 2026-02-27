'use client'

import { useCallback, useEffect, useState } from 'react'
import { env } from '@/env'
import axios from 'axios'
import { toast } from 'sonner'

type PushStatus = 'unsupported' | 'denied' | 'default' | 'granted' | 'loading'

export function usePushNotifications() {
  const [status, setStatus] = useState<PushStatus>('loading')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const checkStatus = useCallback(async () => {
    if (
      typeof window === 'undefined' ||
      !('serviceWorker' in navigator) ||
      !('PushManager' in window)
    ) {
      setStatus('unsupported')
      return
    }

    const permission = Notification.permission

    if (permission === 'denied') {
      setStatus('denied')
      return
    }

    if (permission === 'default') {
      setStatus('default')
      return
    }

    if (permission === 'granted') {
      setStatus('granted')

      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()

      setIsSubscribed(!!subscription)
    }
  }, [])

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  const subscribe = useCallback(async () => {
    try {
      const registration = await navigator.serviceWorker.ready

      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        setStatus(permission as PushStatus)
        return
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: env.NEXT_PUBLIC_VAPID_KEY,
      })

      toast.promise(axios.post('/api/subscribe', subscription.toJSON()), {
        success: () => {
          setIsSubscribed(true)
          setStatus('granted')

          return 'Уведомления успешно включены'
        },
        error: () => 'Ошибка подключения уведомлений',
      })
    } catch (err) {
      console.error(err)
    }
  }, [])

  return {
    status,
    isSubscribed,
    subscribe,
  }
}
