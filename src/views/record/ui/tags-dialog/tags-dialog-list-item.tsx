import { cn } from '@/shared/lib'

import { ListItem } from '../list-item'

interface TagsDialogListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
}

export function TagsDialogListItem({
  name,
  className,
  ...props
}: TagsDialogListItemProps) {
  return (
    <ListItem className={cn(className)} {...props}>
      <p className="flex-1 break-words">{name}</p>
    </ListItem>
  )
}
