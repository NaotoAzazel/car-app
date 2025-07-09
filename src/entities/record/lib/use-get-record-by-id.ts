import { Records } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { getRecordById } from '../api'
import { RECORD_BASE_QUERY_KEY } from './query-keys'

export function useGetRecordById(id: Records['id']) {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getRecordById(id),
    queryKey: [RECORD_BASE_QUERY_KEY, id],
  })

  return { data, isLoading, isError }
}
