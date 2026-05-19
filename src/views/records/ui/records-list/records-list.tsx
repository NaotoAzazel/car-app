'use client'

import { useTranslations } from 'next-intl'

import { useGetRecords } from '@/entities/record'
import { useIntersection } from '@/shared/lib'
import { Icons } from '@/shared/ui'

import { RecordListItem } from './record-list-item'
import { RecordListItemSkeleton } from './record-list-item-skeleton'

const RECORDS_PER_PAGE = 6

interface RecordsListProps {
  searchValue: string
}

export function RecordsList({ searchValue }: RecordsListProps) {
  const t = useTranslations('records.list')

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
    return <p>{t('load-error')}</p>
  }

  if (hasNoResults) {
    return (
      <div className="text-muted-foreground text-sm text-center py-4">
        {/* {searchValue.length > 0
          ? `Ничего не найдено по запросу «${searchValue}»`
          : 'Записи не найдено'} */}
        {searchValue.length > 0
          ? `${t('no-results-for-query')} «${searchValue}»`
          : t('no-records-found')}
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
          typeName={record.recordType?.name}
          tags={record.tags}
          components={record.recordsToComponents}
          additionalSpends={record.recordToAdditionalSpends}
          createdAt={record.createdAt}
        />
      ))}
      {data && data?.length >= RECORDS_PER_PAGE && (
        <div
          className="mt-4 flex flex-row items-center justify-center"
          ref={cursorRef}
        >
          {isFetchingNextPage && (
            <div className="text-muted-foreground flex items-center">
              <Icons.loader className="mr-2 size-4 animate-spin" />
              <span className="text-sm">{t('loading')}</span>
            </div>
          )}
        </div>
      )}
    </>
  )
}
