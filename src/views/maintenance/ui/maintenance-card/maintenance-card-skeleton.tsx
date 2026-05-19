import { RecordTags } from '@prisma/client'
import { useTranslations } from 'next-intl'

import { getRecordTagsLabels } from '@/entities/record'
import { Card, CardHeader, CardTitle, Skeleton } from '@/shared/ui'

interface MaintenanceCardSkeletonProps {
  tag: RecordTags
}

export function MaintenanceCardSkeleton({ tag }: MaintenanceCardSkeletonProps) {
  const tTags = useTranslations('RecordTags')
  const tagsLabels = getRecordTagsLabels(tTags)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center">
          <Skeleton className="w-1/3 h-6" />
        </div>
        <CardTitle>{tagsLabels[tag]}</CardTitle>
        <Skeleton className="h-8 w-[80%]" />
      </CardHeader>
    </Card>
  )
}
