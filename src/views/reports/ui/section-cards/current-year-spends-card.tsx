'use client'

import { useMemo } from 'react'

import { useGetSpendsByYear } from '@/entities/record'
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

export function CurrentYearSpendsCard() {
  const now = new Date()
  const currYear = now.getFullYear()

  const {
    data: currYearSpends,
    isLoading: currYearLoading,
    isError: currYearError,
  } = useGetSpendsByYear(currYear)

  const {
    data: prevYearSpends,
    isLoading: prevYearLoading,
    isError: prevYearError,
  } = useGetSpendsByYear(currYear - 1)

  const isError = currYearError || prevYearError
  const isDataMissing =
    currYearSpends === undefined || prevYearSpends === undefined

  const { percentChange, changeText, Icon } = useMemo(() => {
    if (isDataMissing) {
      return {
        Icon: Icons['droplets'],
      }
    }

    let percentChange = 0
    if (prevYearSpends > 0) {
      percentChange = ((currYearSpends - prevYearSpends) / prevYearSpends) * 100
    }

    const isUp = percentChange > 0

    return {
      percentChange,
      changeText: isUp
        ? `Больше на ${percentChange.toFixed(1)}%`
        : `Меньше на ${Math.abs(percentChange).toFixed(1)}%`,
      Icon: isUp ? Icons['trendingUp'] : Icons['trendingDown'],
    }
  }, [currYearSpends, prevYearSpends])

  if (currYearLoading || prevYearLoading) {
    return <Skeleton className="h-[182px] w-full" />
  }

  if (isError || isDataMissing) {
    return <ErrorCard />
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Траты за текущий год</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {formatCurrency(currYearSpends)}
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
          По сравнению с прошлым годом
        </div>
      </CardFooter>
    </Card>
  )
}
