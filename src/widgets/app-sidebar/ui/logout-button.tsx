'use client'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { Button, Icons } from '@/shared/ui'

export function LogoutButton() {
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post('/api/logout')
    },
    onSuccess: () => {
      router.push('/login')
      toast.success('Выход успешный')
    },
    onError: () =>
      toast.error('Возникла ошибка при выходе, перезагрузите страницу'),
  })

  return (
    <Button
      onClick={() => mutate()}
      size="sm"
      variant="secondary"
      className="mt-auto"
      disabled={isPending}
    >
      {isPending ? (
        <Icons.loader className="mr-1 size-4 animate-spin" />
      ) : (
        <Icons.logout className="mr-1 size-4" />
      )}
      Выйти
    </Button>
  )
}
