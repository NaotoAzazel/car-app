import { Components } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteComponentByIdRequest } from '../api'
import { COMPONENT_BASE_QUERY_KEY } from './query-keys'

export function useDeleteComponent() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteComponentByIdRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [COMPONENT_BASE_QUERY_KEY],
      })
    },
  })

  const deleteComponent = async (id: Components['id']) => {
    await mutateAsync(id)
  }

  return { deleteComponent, isPending }
}
