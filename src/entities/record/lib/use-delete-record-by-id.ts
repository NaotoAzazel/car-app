'use client'

import { Records } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { redirects } from '@/shared/constants'

import { deleteRecordByIdRequest } from '../api'
import { RECORD_BASE_QUERY_KEY } from './query-keys'

export function useDeleteRecordById() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteRecordByIdRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECORD_BASE_QUERY_KEY] })
      router.push(`${redirects.toRecordsPage}`)
    },
  })

  const deleteRecordById = async (id: Records['id']) => {
    await mutateAsync(id)
  }

  return { deleteRecordById, isPending }
}
