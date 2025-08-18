import { Prisma } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { getLatestMileage } from '../api'
import { MILEAGE_BASE_QUERY_KEY } from './query-keys'

interface UseGetLatestMileageParams {
  enabled?: boolean
  where?: Prisma.MileageWhereInput
}

export function useGetLatestMileage({
  enabled,
  where,
}: UseGetLatestMileageParams = {}) {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getLatestMileage({ where }),
    queryKey: [MILEAGE_BASE_QUERY_KEY, where],
    enabled,
  })

  return { data, isLoading, isError }
}
