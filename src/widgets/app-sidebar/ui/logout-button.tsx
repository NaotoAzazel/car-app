'use client'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { Button, Icons } from '@/shared/ui'

export function LogoutButton() {
  const t = useTranslations('appSidebar.logoutButton')
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post('/api/logout')
    },
    onSuccess: () => {
      router.push('/login')
      toast.success(t('logout-successfully'))
    },
    onError: () => toast.error(t('logout-error')),
  })

  return (
    <Button
      onClick={() => mutate()}
      size="sm"
      variant="secondary"
      disabled={isPending}
    >
      {isPending ? (
        <Icons.loader className="mr-1 size-4 animate-spin" />
      ) : (
        <Icons.logout className="mr-1 size-4" />
      )}
      {t('button-label')}
    </Button>
  )
}
