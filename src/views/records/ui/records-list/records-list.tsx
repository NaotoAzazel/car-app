'use client'

import { useGetRecords } from '@/entities/record'
import { useIntersection } from '@/shared/lib'
import { Icons } from '@/shared/ui'

import { RecordListItem } from './record-list-item'
import { RecordListItemSkeleton } from './record-list-item-skeleton'

interface RecordsListProps {
  searchValue: string
}

export function RecordsList({ searchValue }: RecordsListProps) {
  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage } =
    useGetRecords(searchValue)

  const cursorRef = useIntersection(() => {
    if (!isFetchingNextPage) {
      fetchNextPage()
    }
  })

  const isInitialLoading = isLoading && !data
  const hasNoResults = data?.length === 0 && !isFetchingNextPage

  if (isInitialLoading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <RecordListItemSkeleton key={i} />
        ))}
      </>
    )
  }

  if (isError) {
    return <p>error</p>
  }

  if (hasNoResults) {
    return (
      <div className="text-muted-foreground text-sm text-center py-4">
        {searchValue.length > 0
          ? `Ничего не найдено по запросу «${searchValue}»`
          : 'Записи не найдено'}
      </div>
    )
  }

  return (
    <>
      {data?.map((record) => (
        <RecordListItem
          key={record.id}
          recordId={record.id}
          title={record.title}
          type={record.recordType?.name}
          tags={record.TagsComponents}
          components={record.RecordsComponents}
          additionalSpends={record.additionalSpends}
          createdAt={record.createdAt}
        />
      ))}
      {data && (
        <div
          className="mt-4 flex flex-row items-center justify-center"
          ref={cursorRef}
        >
          {isFetchingNextPage && (
            <div className="text-muted-foreground flex items-center">
              <Icons.loader className="mr-2 size-4 animate-spin" />
              <span className="text-sm">Загрузка...</span>
            </div>
          )}
        </div>
      )}
    </>
  )
}
