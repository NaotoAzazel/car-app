import { RecordTags } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { getLatestRecordByTag } from '../api'
import { RECORD_BASE_QUERY_KEY } from './query-keys'

export function useGetLatestRecordByTag(tag: RecordTags) {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getLatestRecordByTag(tag),
    queryKey: [RECORD_BASE_QUERY_KEY, 'latest-record', tag],
  })

  return { data, isLoading, isError }
}
