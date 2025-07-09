import { cn, formatCurrency } from '@/shared/lib'
import { Skeleton } from '@/shared/ui'

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
    <div
      className={cn(
        'w-full flex justify-between border rounded-md py-2 px-3 bg-input/30',
        className,
      )}
      {...props}
    >
      <p className="flex-1 break-words">{name}</p>
      <span className="text-muted-foreground">{formattedCost}</span>
    </div>
  )
}

interface ComponentListItemEmptyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

ComponentListItem.Empty = function ComponentListItemEmpty({
  className,
  ...props
}: ComponentListItemEmptyProps) {
  return (
    <div
      {...props}
      className={cn(
        'w-full border border-dashed rounded-md h-[42px]',
        className,
      )}
    ></div>
  )
}

interface ComponentListItemSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

ComponentListItem.Skeleton = function ComponentListItemEmpty({
  className,
  ...props
}: ComponentListItemSkeletonProps) {
  return (
    <Skeleton
      {...props}
      className={cn('w-full border rounded-md h-[42px]', className)}
    ></Skeleton>
  )
}
