'use client'

import { useMemo } from 'react'

import { useGetSpendsByMonthYear } from '@/entities/record'
import { formatCurrency } from '@/shared/lib'
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

export function CurrentMonthSpendsCard() {
  const now = new Date()
  const currMonth = now.getMonth()
  const currYear = now.getFullYear()

  const {
    data: currMonthSpends,
    isLoading: currMonthLoading,
    isError: currMonthError,
  } = useGetSpendsByMonthYear(currMonth, currYear)

  const previousMonth = (currMonth - 1 + 12) % 12
  const {
    data: prevMonthSpends,
    isLoading: prevMonthLoading,
    isError: prevMonthError,
  } = useGetSpendsByMonthYear(previousMonth, currYear)

  const isLoading = currMonthLoading || prevMonthLoading
  const isError = currMonthError || prevMonthError
  const isDataMissing =
    currMonthSpends === undefined || prevMonthSpends === undefined

  const { percentChange, changeText, Icon } = useMemo(() => {
    if (isDataMissing) {
      return {
        Icon: Icons['droplets'],
      }
    }

    let percentChange = 0
    if (prevMonthSpends > 0) {
      percentChange =
        ((currMonthSpends - prevMonthSpends) / prevMonthSpends) * 100
    }

    const isUp = percentChange > 0

    return {
      percentChange,
      changeText: isUp
        ? `Больше на ${percentChange.toFixed(1)}%`
        : `Меньше на ${Math.abs(percentChange).toFixed(1)}%`,
      Icon: isUp ? Icons['trendingUp'] : Icons['trendingDown'],
    }
  }, [currMonthSpends, prevMonthSpends])

  if (isLoading) {
    return <Skeleton className="h-[182px] w-full" />
  }

  if (isError || isDataMissing) {
    return <ErrorCard />
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Траты за текущий месяц</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {formatCurrency(currMonthSpends)}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <Icon className="size-4" />
            {percentChange?.toFixed(1)}
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
