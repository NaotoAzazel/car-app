import { useInfiniteQuery } from '@tanstack/react-query'

import { getRecordsForPagination } from '../api'
import { RECORD_BASE_QUERY_KEY } from './query-keys'

const RECORDS_PER_PAGE = 6

export function useGetRecords(searchValue?: string) {
  const query = useInfiniteQuery({
    queryKey: [RECORD_BASE_QUERY_KEY, 'list', searchValue],
    queryFn: ({ pageParam }) =>
      getRecordsForPagination({
        page: pageParam,
        itemsPerPage: RECORDS_PER_PAGE,
        includeRecordType: true,
        title: searchValue,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.metadata.hasNextPage ? allPages.length + 1 : undefined
    },
    select: (result) => result.pages.flatMap((page) => page.data),
  })

  return {
    ...query,
    data: query.data,
  }
}
