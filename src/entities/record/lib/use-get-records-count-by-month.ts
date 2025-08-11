import { useQuery } from '@tanstack/react-query'

import { getRecordsCountByMonth } from '../api'
import { RECORD_BASE_QUERY_KEY } from './query-keys'

export function useGetRecordsCountByMonth(month: number) {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getRecordsCountByMonth(month),
    queryKey: [RECORD_BASE_QUERY_KEY, 'count', month],
  })

  return { data, isLoading, isError }
}
