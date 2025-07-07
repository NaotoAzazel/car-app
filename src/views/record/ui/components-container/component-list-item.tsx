import { cn } from '@/shared/lib'

interface ComponentListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  cost: number
  className?: string
}

export function ComponentListItem({
  cost,
  name,
  className,
  ...props
}: ComponentListItemProps) {
  return (
    <div
      className={cn(
        'w-full flex justify-between border rounded-md py-2 px-3',
        className,
      )}
      {...props}
    >
      <p className="flex-1 break-words">{name}</p>
      <span className="text-muted-foreground">{cost} UAH</span>
    </div>
  )
}
