'use client'

import { forwardRef, ReactNode } from 'react'

interface ItemSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  children: ReactNode
}

export const ItemSection = forwardRef<HTMLDivElement, ItemSectionProps>(
  ({ children, title, ...props }, ref) => {
    return (
      <div ref={ref} className="flex flex-col w-full gap-2" {...props}>
        <p className="text-xl font-heading">{title}</p>
        <div className="flex w-full flex-col gap-2">{children}</div>
      </div>
    )
  },
)

ItemSection.displayName = 'ItemSection'
