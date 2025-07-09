import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateRecordByIdRequest } from '../api'
import { UpdateRecordRequest } from '../model'
import { RECORD_BASE_QUERY_KEY } from './query-keys'

export function useUpdateRecordById() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateRecordByIdRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RECORD_BASE_QUERY_KEY],
      })
    },
  })

  const update = async (record: UpdateRecordRequest) => {
    await mutateAsync(record)
  }

  return { update, isPending }
}
