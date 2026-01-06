import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteMileageById } from '../api'
import { MILEAGE_BASE_QUERY_KEY } from './query-keys'

export function useDeleteMileage() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteMileageById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MILEAGE_BASE_QUERY_KEY],
      })
    },
  })

  return {
    deleteMileage: mutateAsync,
    isPending,
  }
}
