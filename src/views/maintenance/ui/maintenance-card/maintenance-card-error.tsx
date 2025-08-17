import { RecordTags } from '@prisma/client'

import { recordTagsRu } from '@/entities/record'
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui'

interface MaintenanceCardErrorProps {
  tag: RecordTags
}

export function MaintenanceCardError({ tag }: MaintenanceCardErrorProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{recordTagsRu[tag]}</CardTitle>
        <CardDescription className="text-destructive">
          Не удалось загрузить данные
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
