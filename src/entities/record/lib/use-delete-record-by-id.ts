'use client'

import { Record } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { redirects } from '@/shared/constants'

import { deleteRecordById as deleteRecordByIdFunc } from '../api'
import { RECORD_BASE_QUERY_KEY } from './query-keys'

export function useDeleteRecordById() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteRecordByIdFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECORD_BASE_QUERY_KEY] })
      router.push(`${redirects.toRecordsPage}`)
    },
  })

  const deleteRecordById = async (id: Record['id']) => {
    await mutateAsync(id)
  }

  return { deleteRecordById, isPending }
}
