import { useInfiniteQuery } from '@tanstack/react-query'

import { getTagsForPagination } from '../api'
import { TAG_BASE_QUERY_KEY } from './query-keys'

const TAGS_PER_PAGE = 6

export function useGetTags(sortByName: string) {
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
      getTagsForPagination({
        page: meta.pageParam,
        itemsPerPage: TAGS_PER_PAGE,
        name: sortByName,
      }),
    queryKey: [TAG_BASE_QUERY_KEY, 'list', sortByName],
    enabled: false,
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
