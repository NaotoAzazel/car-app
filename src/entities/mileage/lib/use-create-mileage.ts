import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createMileage } from '../api'
import { CreateMileageSchema } from '../model'
import { MILEAGE_BASE_QUERY_KEY } from './query-keys'

export function useCreateMileage() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createMileage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MILEAGE_BASE_QUERY_KEY] })
    },
  })

  const create = async (data: CreateMileageSchema) => {
    await mutateAsync(data.mileage)
  }

  return { create, isPending }
}
