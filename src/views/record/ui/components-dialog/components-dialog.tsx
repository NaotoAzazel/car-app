import { useEffect, useState } from 'react'
import { Components } from '@prisma/client'

import { useGetComponents } from '@/entities/component'
import { cn } from '@/shared/lib'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Icons,
  Input,
} from '@/shared/ui'

import { ComponentListItem } from '../components-container/component-list-item'

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
  const { data, isError, isLoading, isFetched, refetch } = useGetComponents()
  const [selected, setSelected] = useState<Components[]>(
    initiallySelected ?? [],
  )
  const [searchValue, setSearchValue] = useState<string>('')

  const filteredData = data?.filter((component) =>
    component.name.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const toggleSelect = (component: Components) => {
    setSelected((prev) => {
      const isSelected = prev.some((c) => c.id === component.id)
      return isSelected
        ? prev.filter((c) => c.id !== component.id)
        : [...prev, component]
    })
  }

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

          {isLoading && (
            <div className="flex text-muted-foreground text-sm items-center justify-center py-5">
              <Icons.loader className="mr-2 size-4 animate-spin" />
              <span>Загрузка компонентов...</span>
            </div>
          )}

          {isError && (
            <div className="text-destructive text-sm text-center py-4">
              Ошибка загрузки компонентов
            </div>
          )}

          {!isLoading && !isError && (
            <div className="grid gap-1">
              {filteredData?.map((component) => (
                <ComponentListItem
                  key={component.id}
                  className={cn(
                    'hover:cursor-pointer hover:bg-accent duration-200',
                    selected.some((c) => c.id === component.id) && 'bg-accent',
                  )}
                  cost={component.cost}
                  name={component.name}
                  onClick={() => toggleSelect(component)}
                />
              ))}
            </div>
          )}

          <Button
            className="w-full mt-4"
            type="button"
            onClick={() => {
              onConfirm(selected)
              onOpenChange(false)
            }}
            disabled={isLoading || isError}
          >
            Применить изменения
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
