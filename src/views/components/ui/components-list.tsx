import { RecordListItemSkeleton } from '@/views/records/ui/records-list/record-list-item-skeleton'
import { Component } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { useDeleteComponent, useGetComponents } from '@/entities/component'
import { useIntersection } from '@/shared/lib'
import { Icons } from '@/shared/ui'

import { ComponentListItem } from './component-list-item'

const COMPONENTS_PER_PAGE = 8

interface ComponentsListProps {
  searchValue: string
}

export function ComponentsList({ searchValue }: ComponentsListProps) {
  const t = useTranslations('components.componentsList')

  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage } =
    useGetComponents({
      sortByName: searchValue,
      initiallyEnabled: true,
      itemsPerPage: COMPONENTS_PER_PAGE,
    })

  const { deleteComponent, isPending } = useDeleteComponent()

  const cursorRef = useIntersection(() => {
    if (!isFetchingNextPage) {
      fetchNextPage()
    }
  })

  const onComponentDelete = async (id: Component['id']) => {
    try {
      toast.promise(deleteComponent(id), {
        loading: t('compponent-deleating'),
        success: () => t('component-deleated'),
        error: t('component-create-error'),
      })
    } catch (error) {
      console.error('onComponentDelete', error)
    }
  }

  const isInitialLoading = isLoading && !data
  const hasNoResults = data?.length === 0 && !isFetchingNextPage

  if (isInitialLoading || isPending) {
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
          ? `${t('nothing-found')} «${searchValue}»`
          : t('components-not-found')}
      </div>
    )
  }

  return (
    <>
      {data?.map((component) => (
        <ComponentListItem
          key={component.id}
          component={component}
          onDelete={() => onComponentDelete(component.id)}
        />
      ))}
      {data && data?.length >= COMPONENTS_PER_PAGE && (
        <div
          className="mt-4 flex flex-row items-center justify-center"
          ref={cursorRef}
        >
          {isFetchingNextPage && (
            <div className="text-muted-foreground flex items-center">
              <Icons.loader className="mr-2 size-4 animate-spin" />
              <span className="text-sm">{t('components-loading')}</span>
            </div>
          )}
        </div>
      )}
    </>
  )
}
