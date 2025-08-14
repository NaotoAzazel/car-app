import { useQuery } from '@tanstack/react-query'

import { getMonthsSpendsByYear } from '../api'
import { MONTHS_SPENDS, RECORD_BASE_QUERY_KEY } from './query-keys'

export function useGetMonthsSpends(year: number) {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getMonthsSpendsByYear(year),
    queryKey: [RECORD_BASE_QUERY_KEY, MONTHS_SPENDS, year],
  })

  return { data, isLoading, isError }
}
