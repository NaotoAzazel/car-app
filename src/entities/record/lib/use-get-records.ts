import { useInfiniteQuery } from '@tanstack/react-query'

import { getRecordsForPagination } from '../api'
import { RECORD_BASE_QUERY_KEY } from './query-keys'

const RECORDS_PER_PAGE = 6

export function useGetRecords(searchValue?: string) {
  const {
    data,
    isLoading,
    isError,
    isFetched,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: (meta) =>
      getRecordsForPagination({
        page: meta.pageParam,
        itemsPerPage: RECORDS_PER_PAGE,
        includeComponents: true,
        title: searchValue,
      }),
    queryKey: [RECORD_BASE_QUERY_KEY, 'list', searchValue],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return lastPage.metadata.hasNextPage ? nextPage : undefined
    },
    select: (result) => result.pages.flatMap((page) => page.data),
  })

  return {
    data,
    isLoading,
    isError,
    isFetched,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  }
}
