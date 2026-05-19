import { useEffect, useState } from 'react'
import { Component } from '@prisma/client'
import { useTranslations } from 'next-intl'

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
  onConfirm: (components: Component[]) => void
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  initiallySelected?: Component[]
}

export function ComponentsDialog({
  onConfirm,
  isOpen,
  onOpenChange,
  initiallySelected,
}: ComponentsDialogProps) {
  const t = useTranslations(
    'record.overviewForm.componentsContainer.componentsDialog',
  )

  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearch = useDebounce<string>(searchValue, 1_000)

  const [selected, setSelected] = useState<Component[]>(initiallySelected ?? [])

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

  const toggleSelect = (component: Component) => {
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
            <DialogTitle>{t('chooce-component')}</DialogTitle>
          </DialogHeader>
        </DialogHeader>

        <div className="grid gap-2">
          <Input
            placeholder={t('search-input-placeholder')}
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
            {t('apply-changes-button')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
