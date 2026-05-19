'use client'

import { RecordTags } from '@prisma/client'
import { useTranslations } from 'next-intl'

import { getRecordTagsLabels, useGetLatestRecordByTag } from '@/entities/record'
import { cn } from '@/shared/lib'
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui'

import { CardStatus, getStatusConfig, maintenanceIntervals } from '../../lib'
import { MaintenanceCardError } from './maintenance-card-error'
import { MaintenanceCardSkeleton } from './maintenance-card-skeleton'

interface MaintenanceCardProps {
  tag: RecordTags
  currMileage: number
}

export function MaintenanceCard({ tag, currMileage }: MaintenanceCardProps) {
  const tTags = useTranslations('RecordTags')
  const tagsLabels = getRecordTagsLabels(tTags)

  const tGlobal = useTranslations()
  const statusConfig = getStatusConfig(tGlobal)

  const tCard = useTranslations('maintenance.maintenanceCard')

  const { data, isLoading, isError } = useGetLatestRecordByTag(tag)
  const interval = maintenanceIntervals[tag]

  if (isLoading) {
    return <MaintenanceCardSkeleton tag={tag} />
  }

  if (isError) {
    return <MaintenanceCardError tag={tag} />
  }

  if (!data || data.length === 0) {
    const { icon: Icon, color, label } = statusConfig[CardStatus.NO_DATA]

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <Icon className={cn('size-4', color)} />
            <span>{label}</span>
          </div>
          <CardTitle>{tagsLabels[tag]}</CardTitle>
          <CardDescription>
            {tCard('every-replacement')} ~{interval.toLocaleString()}{' '}
            {tCard('km')} <br />
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const mileageLatestRecord = data[0].mileage
  const mileageFromLastReplacement = currMileage - mileageLatestRecord
  const mileageToNextReplacement = interval - mileageFromLastReplacement

  let status: CardStatus = CardStatus.VERY_BAD
  let replacementText = `${tCard('to-replacement')} ${mileageToNextReplacement.toLocaleString()} ${tCard('km')}`

  if (mileageToNextReplacement > interval * 0.3) {
    status = CardStatus.ALL_GOOD
  } else if (mileageToNextReplacement > 300) {
    status = CardStatus.AVG_CONDITION
  } else {
    replacementText = tCard('replacement-soon')
  }

  const { icon: Icon, color, label } = statusConfig[status]

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex gap-2 items-center">
          <Icon className={cn('size-4', color)} />
          <span>{label}</span>
        </div>
        <CardTitle>{tagsLabels[tag]}</CardTitle>
        <CardDescription>
          {tCard('every-replacement')} ~{interval.toLocaleString()}{' '}
          {tCard('km')}
          <br />
          <span className="font-semibold">{replacementText}</span>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
