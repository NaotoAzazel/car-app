import { RecordTags } from '@prisma/client'
import { useTranslations } from 'next-intl'

import { getRecordTagsLabels } from '@/entities/record'
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui'

interface MaintenanceCardErrorProps {
  tag: RecordTags
}

export function MaintenanceCardError({ tag }: MaintenanceCardErrorProps) {
  const t = useTranslations('maintenance.maintenanceCard')
  const tTags = useTranslations('RecordTags')
  const tagsLabels = getRecordTagsLabels(tTags)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{tagsLabels[tag]}</CardTitle>
        <CardDescription className="text-destructive">
          {t('load-error')}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
