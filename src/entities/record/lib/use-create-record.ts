'use client'

import { Record } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { redirects } from '@/shared/constants'

import { createRecord } from '../api'
import { RECORD_BASE_QUERY_KEY } from './query-keys'

export function useCreateRecord() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createRecord,
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: [RECORD_BASE_QUERY_KEY] })
      router.push(`${redirects.toRecordOverviewPage}/${record.id}`)
    },
  })

  const create = async (title: Record['title']) => {
    const now = new Date()

    await mutateAsync({
      title,
      mileage: 0,
      recordTypeId: null,
      tags: [],
      createdAt: now,
    })
  }

  return { create, isPending }
}
