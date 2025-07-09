import { cn } from '@/shared/lib'
import { Skeleton } from '@/shared/ui'

interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ListItem({ className, children, ...props }: ListItemProps) {
  return (
    <div
      className={cn(
        'w-full flex justify-between border rounded-md py-2 px-3 bg-input/30',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface ListItemEmptyProps extends React.HTMLAttributes<HTMLDivElement> {}

ListItem.Empty = function ComponentListItemEmpty({
  className,
  ...props
}: ListItemEmptyProps) {
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

interface ListItemSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

ListItem.Skeleton = function ComponentListItemEmpty({
  className,
  ...props
}: ListItemSkeletonProps) {
  return (
    <Skeleton
      {...props}
      className={cn('w-full border rounded-md h-[42px]', className)}
    ></Skeleton>
  )
}
