'use client'

import { RecordsComponentWithData } from '@/entities/record'
import { formatCurrency } from '@/shared/lib'
import { ScrollArea } from '@/shared/ui'

import { ListItem } from '../list-item'
import { ComponentListItem } from './component-list-item'

const VISIBLE_COUNT = 6

interface ComponentsListProps {
  components: RecordsComponentWithData[]
}

export function ComponentsList({ components }: ComponentsListProps) {
  const totalCost = components.reduce((sum, component) => {
    return sum + component.component.cost
  }, 0)

  const formattedCost = formatCurrency(totalCost)

  const placeholders = Array.from({
    length: Math.max(0, VISIBLE_COUNT - components.length),
  })

  if (components.length === 0) {
    return (
      <span className="text-sm text-muted-foreground py-10">
        Компоненты не добавлены
      </span>
    )
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      <ScrollArea className="h-72 w-full rounded-md" type="always">
        {components.map((component, i) => (
          <ComponentListItem
            className="mt-1"
            name={component.component.name}
            cost={component.component.cost}
            key={i}
          />
        ))}

        {placeholders.map((_, i) => (
          <ListItem.Empty key={i} className="mt-1" />
        ))}
      </ScrollArea>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Общяя сумма</span>
        <span className="font-semibold">{formattedCost}</span>
      </div>
    </div>
  )
}
