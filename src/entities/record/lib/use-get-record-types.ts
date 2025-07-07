import { useQuery } from '@tanstack/react-query'

import { getRecordTypes } from '../api'
import { RECORD_BASE_QUERY_KEY } from './query-keys'

export function useGetRecordTypes() {
  const { data, isLoading, isError, isFetched, refetch } = useQuery({
    queryFn: () => getRecordTypes(),
    queryKey: [RECORD_BASE_QUERY_KEY, 'types'],
    enabled: false,
  })

  return { data, isLoading, isError, isFetched, refetch }
}
