import { cn, formatCurrency } from '@/shared/lib'

import { ListItem } from '../list-item'

interface ComponentListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  cost: number
}

export function ComponentListItem({
  name,
  cost,
  className,
  ...props
}: ComponentListItemProps) {
  const formattedCost = formatCurrency(cost)

  return (
    <ListItem {...props} className={cn('flex', className)}>
      <p className="flex-1 break-all break-words">{name}</p>
      <span className="text-muted-foreground flex items-center">
        {formattedCost}
      </span>
    </ListItem>
  )
}
