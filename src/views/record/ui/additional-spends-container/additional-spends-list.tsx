'use client'

import { AdditionalSpendsSchema } from '@/entities/record'
import { formatCurrency } from '@/shared/lib'
import { ScrollArea } from '@/shared/ui'

import { ListItem } from '../list-item'

const VISIBLE_COUNT = 4

interface AdditionalSpendsListProps {
  additionalSpends: AdditionalSpendsSchema[]
  onDelete: (id: number) => void
}

export function AdditionalSpendsList({
  additionalSpends,
  onDelete,
}: AdditionalSpendsListProps) {
  if (!additionalSpends.length) {
    return (
      <div className="flex items-center justify-center">
        <span className="text-sm text-muted-foreground py-10">
          Дополнительные траты не добавлены
        </span>
      </div>
    )
  }

  const placeholders = Array.from({
    length: Math.max(0, VISIBLE_COUNT - additionalSpends.length),
  })

  const totalCost = additionalSpends.reduce((sum, spend) => {
    return sum + spend.cost
  }, 0)

  return (
    <div className="flex flex-col space-y-4 w-full">
      <ScrollArea className="h-72 w-full rounded-md" type="always">
        {additionalSpends.map(({ id, name, cost }) => (
          <ListItem key={id} className="mt-1">
            <div>
              <p className="flex flex-1 break-all break-words items-center">
                {name}
              </p>
              <button
                type="button"
                className="text-muted-foreground text-xs hover:underline hover:cursor-pointer"
                onClick={() => onDelete(id)}
              >
                Удалить
              </button>
            </div>
            <span className="text-muted-foreground flex items-center">
              {formatCurrency(Number(cost))}
            </span>
          </ListItem>
        ))}

        {placeholders.map((_, i) => (
          <ListItem.Empty key={i} className="mt-1 h-[66px]" />
        ))}
      </ScrollArea>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Общяя сумма</span>
        <span className="font-semibold">{formatCurrency(totalCost)}</span>
      </div>
    </div>
  )
}
