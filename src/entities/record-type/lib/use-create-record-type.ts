import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createRecordType } from '../api'
import { RECORD_TYPE_BASE_QUERY_KEY } from './query-keys'

export function useCreateRecordType() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createRecordType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECORD_TYPE_BASE_QUERY_KEY] })
    },
  })

  const create = async (name: string) => {
    await mutateAsync(name)
  }

  return { create, isPending }
}
