import { useQuery } from '@tanstack/react-query'

import { getMileageByDateRange } from '../api'
import { MILEAGE_BASE_QUERY_KEY, MONTH } from './query-keys'

interface UseGetMileageByDateRange {
  enabled: boolean
  from?: Date
  to?: Date
}

export function useGetMileageByDateRange({
  enabled,
  from,
  to,
}: UseGetMileageByDateRange) {
  const { data, isLoading, isError, isRefetching, refetch } = useQuery({
    queryFn: () => getMileageByDateRange(from as Date, to as Date),
    queryKey: [MILEAGE_BASE_QUERY_KEY, MONTH, from, to],
    enabled,
  })

  return { data, isLoading, isError, isRefetching, refetch }
}
