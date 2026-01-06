import { Skeleton } from '@/shared/ui'

export function ContentItemSkeleton({ items = 1 }: { items?: number }) {
  return (
    <>
      {Array.from({ length: items }).map((_, i) => (
        <Skeleton key={i} className="h-[42px]" />
      ))}
    </>
  )
}
