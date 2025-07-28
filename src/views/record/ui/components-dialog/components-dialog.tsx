import { useEffect, useState } from 'react'
import { Components } from '@prisma/client'

import { useGetComponents } from '@/entities/component'
import { useDebounce, useIntersection } from '@/shared/lib'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
} from '@/shared/ui'

import { ComponentsDialogList } from './components-dialog-list'

const COMPONENTS_PER_PAGE = 6

interface ComponentsDialogProps {
  onConfirm: (components: Components[]) => void
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  initiallySelected?: Components[]
}

export function ComponentsDialog({
  onConfirm,
  isOpen,
  onOpenChange,
  initiallySelected,
}: ComponentsDialogProps) {
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearch = useDebounce<string>(searchValue, 1_000)

  const [selected, setSelected] = useState<Components[]>(
    initiallySelected ?? [],
  )

  const {
    data,
    isError,
    isLoading,
    isFetched,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useGetComponents({
    sortByName: debouncedSearch,
    itemsPerPage: COMPONENTS_PER_PAGE,
  })

  const toggleSelect = (component: Components) => {
    setSelected((prev) => {
      const isSelected = prev.some((c) => c.id === component.id)
      return isSelected
        ? prev.filter((c) => c.id !== component.id)
        : [...prev, component]
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
            <DialogTitle>Выбор компонентов</DialogTitle>
          </DialogHeader>
        </DialogHeader>

        <div className="grid gap-2">
          <Input
            placeholder="Поиск..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <ComponentsDialogList
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
