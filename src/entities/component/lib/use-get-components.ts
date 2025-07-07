import { useQuery } from '@tanstack/react-query'

import { getComponents } from '../api'
import { COMPONENT_BASE_QUERY_KEY } from './query-keys'

export function useGetComponents() {
  const { data, isLoading, isError, isFetched, refetch } = useQuery({
    queryFn: () => getComponents(),
    queryKey: [COMPONENT_BASE_QUERY_KEY, 'list'],
    enabled: false,
  })

  return { data, isLoading, isError, isFetched, refetch }
}
