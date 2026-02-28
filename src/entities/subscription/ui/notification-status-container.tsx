'use client'

import { cn } from '@/shared/lib'
import { Button, Icons } from '@/shared/ui'

import { usePushNotifications } from '../lib'

export function NotificationStatusContainer() {
  const { status, isSubscribed, subscribe } = usePushNotifications()

  const isEnabled = status === 'granted' && isSubscribed
  const isDenied = status === 'denied'

  return (
    <div className="rounded-md border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Уведомления</p>

        <div
          className={cn(
            'flex items-center gap-1.5 text-sm font-medium',
            isEnabled
              ? 'text-emerald-500'
              : isDenied
                ? 'text-red-500'
                : 'text-muted-foreground',
          )}
        >
          {isEnabled ? (
            <Icons.checkCircle className="size-4" />
          ) : (
            <Icons.alertCircle className="size-4" />
          )}

          {isEnabled ? 'Включены' : isDenied ? 'Запрещены' : 'Отключены'}
        </div>
      </div>

      {!isEnabled && (
        <Button
          size="sm"
          variant="secondary"
          className="w-full"
          onClick={subscribe}
          disabled={isDenied || status === 'loading'}
        >
          {isDenied ? 'Запрещены' : 'Включить уведомления'}
        </Button>
      )}
    </div>
  )
}
