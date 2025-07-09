import { Tags } from '@prisma/client'

import { cn } from '@/shared/lib'
import { Icons, ScrollArea } from '@/shared/ui'

import { ListItem } from '../list-item'
import { TagsDialogListItem } from './tags-dialog-list-item'

interface TagsDialogListProps {
  data?: Tags[]
  isLoading: boolean
  isError: boolean
  isFetchingNextPage: boolean
  searchValue: string
  selected: Tags[]
  onToggle: (component: Tags) => void
  cursorRef: (el: HTMLDivElement | null) => void
}

export function TagsDialogList({
  data,
  isLoading,
  isError,
  isFetchingNextPage,
  searchValue,
  selected,
  onToggle,
  cursorRef,
}: TagsDialogListProps) {
  const isInitialLoading = isLoading && !data
  const hasNoResults = data?.length === 0 && !isFetchingNextPage

  if (isInitialLoading) {
    return (
      <div className="grid gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <ListItem.Skeleton key={i} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-destructive text-sm text-center py-4">
        Ошибка загрузки компонентов
      </div>
    )
  }

  if (hasNoResults) {
    return (
      <div className="text-muted-foreground text-sm text-center py-4">
        {searchValue.length > 0
          ? `Ничего не найдено по запросу «${searchValue}»`
          : 'Компоненты не найдены'}
      </div>
    )
  }

  return (
    <ScrollArea className="h-64 w-full" type="always">
      {data?.map((tag) => (
        <TagsDialogListItem
          key={tag.id}
          name={tag.name}
          className={cn(
            'hover:cursor-pointer hover:bg-accent duration-200 mt-1',
            selected.some((c) => c.id === tag.id) && 'bg-accent',
          )}
          onClick={() => onToggle(tag)}
        />
      ))}
      {data && data.length >= 6 && (
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
    </ScrollArea>
  )
}
