'use client'

import { DateTime } from 'luxon'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
  Skeleton,
} from '@/shared/ui'

import { useGetLatestMileage } from '../../lib'

export const statusVisualMap = {
  RECORD_FOUND: {
    icon: Icons.alertTriangle,
    color: 'text-yellow-500',
  },
  NO_DATA: {
    icon: Icons.checkCircle,
    color: 'text-green-500',
  },
} as const

export const getStatusMap = (t: (key: string) => string) => {
  return {
    RECORD_FOUND: {
      ...statusVisualMap.RECORD_FOUND,
      text: t('MileageStatus.RECORD_FOUND'),
    },
    NO_DATA: {
      ...statusVisualMap.NO_DATA,
      text: t('MileageStatus.NO_DATA'),
    },
  } as const
}

interface MileageInfoCardProps {
  isLoadTodayMileage: boolean
}

export function MileageInfoCard({ isLoadTodayMileage }: MileageInfoCardProps) {
  const t = useTranslations('record.mileage-info-card')

  const tGlobal = useTranslations()
  const statusMap = getStatusMap(tGlobal)

  const startOfDay = DateTime.now()
    .setZone('Europe/Kyiv')
    .startOf('day')
    .toJSDate()
  const endOfDay = DateTime.now().setZone('Europe/Kyiv').endOf('day').toJSDate()
  const {
    data: todayMileage,
    isError: todayMileageError,
    isLoading: todayMileageLoading,
  } = useGetLatestMileage({
    enabled: isLoadTodayMileage,
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  })

  const {
    data: currMileage,
    isError: currMileageError,
    isLoading: currMileageLoading,
  } = useGetLatestMileage()

  if (todayMileageLoading || currMileageLoading) {
    return <Skeleton className="h-[92px] w-full" />
  }

  if (todayMileageError || currMileageError) {
    return (
      <Card>
        <CardHeader>
          <CardDescription>{t('card-description')}</CardDescription>
          <CardTitle className="text-destructive">\{t('card-title')}</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  const hasTodayMileage = !!todayMileage?.length
  const hasCurrMileage = !!currMileage?.length

  const statusKey = hasTodayMileage ? 'RECORD_FOUND' : 'NO_DATA'
  const { icon: Icon, text, color } = statusMap[statusKey]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center">
          <Icon className={cn('size-8 md:size-4 mr-2', color)} />
          <span>{text}</span>
        </CardTitle>
        <CardDescription>
          {hasCurrMileage ? (
            <>
              {t('current-mileage')}:{' '}
              <span className="font-semibold">
                {currMileage[0].mileage.toLocaleString()} {t('km')}
              </span>
            </>
          ) : (
            t('no-previous-mileage-records')
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
