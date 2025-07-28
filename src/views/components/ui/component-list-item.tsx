import { useState } from 'react'
import { Components } from '@prisma/client'

import { formatCurrency } from '@/shared/lib'
import { Button, Icons } from '@/shared/ui'

interface ComponentListItemProps {
  component: Components
  onDelete: () => void
}

export function ComponentListItem({
  component,
  onDelete,
}: ComponentListItemProps) {
  const [confirmingDelete, setConfirmingDelete] = useState<boolean>(false)
  const { name, cost, code, isLiquid } = component

  const handleClick = () => {
    if (confirmingDelete) {
      onDelete?.()
    } else {
      setConfirmingDelete(true)
    }
  }

  if (confirmingDelete) {
    return (
      <div
        onClick={handleClick}
        className="hover:cursor-pointer border border-dotted rounded-md p-4 bg-destructive/10 border-destructive/50 duration-200 flex flex-col"
      >
        <div className="flex items-center justify-between flex-row gap-2">
          <p className="text-sm font-medium text-destructive">
            Удалить компонент?
          </p>
          <div className="flex items-center gap-2">
            <Button
              onClick={(e) => {
                e.stopPropagation()
                setConfirmingDelete(false)
              }}
              variant="secondary"
            >
              Отмена
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={handleClick}
      className="hover:cursor-pointer border rounded-md p-4 hover:bg-input/30 hover:border-primary/50 duration-200 flex flex-col"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
        <div>
          <div className="flex flex-row items-center gap-2">
            <p className="break-all font-heading font-semibold text-lg break-words">
              {name}
            </p>
            {isLiquid && (
              <span title="Жидкий">
                <Icons.droplets className="text-muted-foreground size-4" />
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {code?.length ? code : 'Код не указан'}
          </p>
        </div>

        <span className="text-primary font-semibold whitespace-nowrap sm:text-right">
          {formatCurrency(cost)}
        </span>
      </div>
    </div>
  )
}
