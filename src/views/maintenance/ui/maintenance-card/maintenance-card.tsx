'use client'

import { RecordTags } from '@prisma/client'

import {
  recordIntervals,
  recordTagsRu,
  useGetLatestRecordByTag,
} from '@/entities/record'
import { cn } from '@/shared/lib'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
} from '@/shared/ui'

import { MaintenanceCardError } from './maintenance-card-error'
import { MaintenanceCardSkeleton } from './maintenance-card-skeleton'

export enum CardStatus {
  NO_DATA,
  ALL_GOOD,
  AVG_CONDITION,
  VERY_BAD,
}

const statusConfig = {
  [CardStatus.NO_DATA]: {
    icon: Icons.helpCircle,
    color: 'text-gray-400',
    label: 'Нет данных',
  },
  [CardStatus.ALL_GOOD]: {
    icon: Icons.checkCircle,
    color: 'text-green-500',
    label: 'Всё в порядке',
  },
  [CardStatus.AVG_CONDITION]: {
    icon: Icons.alertTriangle,
    color: 'text-yellow-500',
    label: 'Среднее состояние',
  },
  [CardStatus.VERY_BAD]: {
    icon: Icons.alertCircle,
    color: 'text-red-500',
    label: 'Очень плохо',
  },
}

interface MaintenanceCardProps {
  tag: RecordTags
  currMileage: number
}

export function MaintenanceCard({ tag, currMileage }: MaintenanceCardProps) {
  const { data, isLoading, isError } = useGetLatestRecordByTag(tag)
  const interval = recordIntervals[tag]

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
          <CardTitle>{recordTagsRu[tag]}</CardTitle>
          <CardDescription>
            Каждая замена осуществляется ~{interval.toLocaleString()} км <br />
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const mileageLatestRecord = data[0].mileage
  const mileageFromLastReplacement = currMileage - mileageLatestRecord
  const mileageToNextReplacement = interval - mileageFromLastReplacement

  let status: CardStatus = CardStatus.VERY_BAD
  let replacementText = `До замены ${mileageToNextReplacement.toLocaleString()} км`

  if (mileageToNextReplacement > interval * 0.3) {
    status = CardStatus.ALL_GOOD
  } else if (mileageToNextReplacement > 300) {
    status = CardStatus.AVG_CONDITION
  } else {
    replacementText = 'Требуется срочная замена'
  }

  const { icon: Icon, color, label } = statusConfig[status]

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex gap-2 items-center">
          <Icon className={cn('size-4', color)} />
          <span>{label}</span>
        </div>
        <CardTitle>{recordTagsRu[tag]}</CardTitle>
        <CardDescription>
          Каждая замена осуществляется ~{interval.toLocaleString()} км <br />
          <span className="font-semibold">{replacementText}</span>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
