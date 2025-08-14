'use client'

import { useMemo } from 'react'

import { useGetRecordsCountByMonth } from '@/entities/record'
import {
  Badge,
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Icons,
  Skeleton,
} from '@/shared/ui'

import { ErrorCard } from './error-card'

export function CurrentMonthAddedRecordsCard() {
  const currentMonth = new Date().getMonth()
  const previousMonth = (currentMonth - 1 + 12) % 12

  const {
    data: currCount,
    isLoading: currLoading,
    isError: currError,
  } = useGetRecordsCountByMonth(currentMonth)
  const {
    data: prevCount,
    isLoading: prevLoading,
    isError: prevError,
  } = useGetRecordsCountByMonth(previousMonth)

  const isLoading = currLoading || prevLoading
  const isError = currError || prevError
  const isDataMissing = currCount === undefined || prevCount === undefined

  const { change, changeText, Icon } = useMemo(() => {
    if (isDataMissing) {
      return { Icon: Icons['loader'] }
    }

    const change = currCount - prevCount
    const isUp = change > 0
    return {
      change,
      changeText: isUp ? `Больше на ${change}` : `Меньше на ${-change}`,
      Icon: isUp ? Icons['trendingUp'] : Icons['trendingDown'],
    }
  }, [currCount, prevCount])

  if (isLoading) {
    return <Skeleton className="h-[182px] w-full" />
  }
  if (isError || isDataMissing) {
    return <ErrorCard />
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Записей за текущий месяц</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {currCount}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <Icon className="size-4" />
            {change}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium items-center">
          {changeText} <Icon className="size-4" />
        </div>
        <div className="text-muted-foreground">
          По сравнению с прошлым месяцем
        </div>
      </CardFooter>
    </Card>
  )
}
