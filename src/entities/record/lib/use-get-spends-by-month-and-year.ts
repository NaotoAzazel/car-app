import { useQuery } from '@tanstack/react-query'

import { getSpendsByMonthYear } from '../api'
import { RECORD_BASE_QUERY_KEY, SPENDS_BY_MONTH_AND_YEAR } from './query-keys'

export function useGetSpendsByMonthYear(month: number, year: number) {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getSpendsByMonthYear(month, year),
    queryKey: [RECORD_BASE_QUERY_KEY, SPENDS_BY_MONTH_AND_YEAR, month, year],
  })

  return { data, isLoading, isError }
}
