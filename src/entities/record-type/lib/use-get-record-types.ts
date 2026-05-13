import { useQuery } from '@tanstack/react-query'

import { getRecordTypes } from '../../record/api'
import { GET_ALL, RECORD_TYPE_BASE_QUERY_KEY } from './query-keys'

export function useGetRecordTypes(disabled?: boolean) {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getRecordTypes(),
    queryKey: [RECORD_TYPE_BASE_QUERY_KEY, GET_ALL],
    enabled: !disabled,
  })

  return { data, isLoading, isError }
}
