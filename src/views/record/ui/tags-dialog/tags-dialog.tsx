import { useEffect, useState } from 'react'
import { Tags } from '@prisma/client'

import { useGetTags } from '@/entities/tag'
import { useDebounce, useIntersection } from '@/shared/lib'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
} from '@/shared/ui'

import { TagsDialogList } from './tags-dialog-list'

interface TagsDialogProps {
  onConfirm: (tags: Tags[]) => void
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  initiallySelected?: Tags[]
}

export function TagsDialog({
  onConfirm,
  isOpen,
  onOpenChange,
  initiallySelected,
}: TagsDialogProps) {
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearch = useDebounce<string>(searchValue, 1_000)

  const [selected, setSelected] = useState<Tags[]>(initiallySelected ?? [])

  const {
    data,
    isError,
    isLoading,
    isFetched,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useGetTags(debouncedSearch)

  const toggleSelect = (tag: Tags) => {
    setSelected((prev) => {
      const isSelected = prev.some((c) => c.id === tag.id)
      return isSelected ? prev.filter((c) => c.id !== tag.id) : [...prev, tag]
    })
  }

  const cursorRef = useIntersection(() => {
    if (!isFetchingNextPage) {
      fetchNextPage()
    }
  })

  useEffect(() => {
    if (debouncedSearch.length > 0) {
      refetch()
    }
  }, [debouncedSearch])

  useEffect(() => {
    if (isOpen && !isFetched) {
      refetch()
    }
  }, [isOpen, onOpenChange])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogHeader>
            <DialogTitle>Выбор тэгов</DialogTitle>
          </DialogHeader>
        </DialogHeader>

        <div className="grid gap-2">
          <Input
            placeholder="Поиск..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <TagsDialogList
            data={data}
            isLoading={isLoading}
            isError={isError}
            isFetchingNextPage={isFetchingNextPage}
            searchValue={debouncedSearch}
            selected={selected}
            onToggle={toggleSelect}
            cursorRef={cursorRef}
          />

          <Button
            className="w-full mt-4"
            type="button"
            onClick={() => {
              onConfirm(selected)
              onOpenChange(false)
            }}
            disabled={isLoading || isError || isFetchingNextPage}
          >
            Применить изменения
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
