'use client'

import { DateTime } from 'luxon'

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

const statusMap = {
  RECORD_FOUND: {
    icon: Icons.alertTriangle,
    text: 'Сегодня уже была добавлена запись о пробеге',
    color: 'text-yellow-500',
  },
  NO_DATA: {
    icon: Icons.checkCircle,
    text: 'За этот день записей о пробеге не найдено',
    color: 'text-green-500',
  },
}

interface MileageInfoCardProps {
  isLoadTodayMileage: boolean
}

export function MileageInfoCard({ isLoadTodayMileage }: MileageInfoCardProps) {
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
          <CardDescription>Возникла ошибка</CardDescription>
          <CardTitle className="text-destructive">
            Не удалось загрузить данные
          </CardTitle>
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
              Текущий пробег:{' '}
              <span className="font-semibold">
                {currMileage[0].mileage.toLocaleString()} км
              </span>
            </>
          ) : (
            'Предыдущих записей о пробеге не найдено'
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
