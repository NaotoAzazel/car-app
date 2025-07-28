'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createComponentRequest } from '../api'
import { CreateComponentSchema } from '../model'
import { COMPONENT_BASE_QUERY_KEY } from './query-keys'

export function useCreateComponent() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createComponentRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMPONENT_BASE_QUERY_KEY] })
    },
  })

  const create = async (component: CreateComponentSchema) => {
    await mutateAsync(component)
  }

  return { create, isPending }
}
