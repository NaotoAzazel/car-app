'use client'

import { Records } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { redirects } from '@/shared/constants'

import { createRecordRequest } from '../api'
import { RECORD_BASE_QUERY_KEY } from './query-keys'

export function useCreateRecord() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createRecordRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [RECORD_BASE_QUERY_KEY] })
      router.push(`${redirects.toRecordOverviewPage}/${data.record.id}`)
    },
  })

  const create = async (title: Records['title']) => {
    const now = new Date()

    await mutateAsync({
      title,
      mileage: 0,
      additionalSpends: [],
      recordType: null,
      tags: [],
      createdAt: now,
    })
  }

  return { create, isPending }
}
