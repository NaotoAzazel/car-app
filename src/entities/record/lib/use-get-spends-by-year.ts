import { useQuery } from '@tanstack/react-query'

import { getSpendsByYear } from '../api'
import { RECORD_BASE_QUERY_KEY, SPENDS_BY_YEAR } from './query-keys'

export function useGetSpendsByYear(year: number) {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getSpendsByYear(year),
    queryKey: [RECORD_BASE_QUERY_KEY, SPENDS_BY_YEAR, year],
  })

  return { data, isLoading, isError }
}
