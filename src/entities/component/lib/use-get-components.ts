import { useInfiniteQuery } from '@tanstack/react-query'

import { getComponentsForPagination } from '../api'
import { COMPONENT_BASE_QUERY_KEY } from './query-keys'

const COMPONENTS_PER_PAGE = 6

interface UseGetComponentsParams {
  sortByName: string
  initiallyEnabled?: boolean
  itemsPerPage: number
}

export function useGetComponents({
  sortByName,
  initiallyEnabled = false,
  itemsPerPage,
}: UseGetComponentsParams) {
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
      getComponentsForPagination({
        page: meta.pageParam,
        itemsPerPage: itemsPerPage,
        name: sortByName,
      }),
    queryKey: [COMPONENT_BASE_QUERY_KEY, 'list', sortByName],
    enabled: initiallyEnabled,
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
