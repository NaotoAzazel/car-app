import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  CreateAdditionalSpendSchema,
  RECORD_BASE_QUERY_KEY,
} from '@/entities/record'

import { createAdditionalSpend, linkSpendToRecord } from '../api'

export function useCreateAndLinkSpend() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      data,
      recordId,
    }: {
      data: CreateAdditionalSpendSchema
      recordId: number
    }) => {
      const newSpend = await createAdditionalSpend(data)
      await linkSpendToRecord(newSpend.id, recordId)
      return newSpend
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [RECORD_BASE_QUERY_KEY, variables.recordId],
      })
    },
  })
}
