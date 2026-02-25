import { cn } from '@/shared/lib'

import { Icons } from '../icons/icons'

interface StateContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StateContainer({
  className,
  children,
  ...props
}: StateContainerProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-1 py-3 rounded-lg borderborder-dashed bg-muted/30 px-4 text-center',
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface StateContainerIconProps
  extends Partial<React.SVGProps<SVGSVGElement>> {
  name: keyof typeof Icons
}

StateContainer.Icon = function StateContainerIcon({
  name,
  className,
  ...props
}: StateContainerIconProps) {
  const Icon = Icons[name]

  if (!Icon) {
    return null
  }

  return <Icon className={cn('size-8', className)} {...props} />
}

interface StateContainerTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

StateContainer.Title = function StateContainerTItle({
  className,
  ...props
}: StateContainerTitleProps) {
  return (
    <h2
      className={cn(
        'text-sm md:text-base font-medium text-destructive',
        className,
      )}
      {...props}
    />
  )
}

interface StateContainerDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

StateContainer.Description = function StateContainerDescription({
  className,
  ...props
}: StateContainerDescriptionProps) {
  return (
    <p
      className={cn('text-xs md:text-md text-muted-foreground', className)}
      {...props}
    />
  )
}

interface StateContainerActionsProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

StateContainer.Actions = function StateContainerActions({
  className,
  ...props
}: StateContainerActionsProps) {
  return <div className={cn('flex mt-2 gap-2', className)} {...props} />
}
