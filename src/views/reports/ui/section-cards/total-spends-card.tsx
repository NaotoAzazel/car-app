'use client'

import { useQuery } from '@tanstack/react-query'

import {
  AVARAGE_SPENDS_IN_MONTH,
  avgSpendsInMonth,
  getTotalSpends,
  RECORD_BASE_QUERY_KEY,
  TOTAL_SPENDS,
} from '@/entities/record'
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

export function TotalSpendsCard() {
  const avarageSpendsInMonth = useQuery({
    queryFn: async () => await avgSpendsInMonth(),
    queryKey: [RECORD_BASE_QUERY_KEY, AVARAGE_SPENDS_IN_MONTH],
  })

  const totalSpends = useQuery({
    queryFn: async () => await getTotalSpends(),
    queryKey: [RECORD_BASE_QUERY_KEY, TOTAL_SPENDS],
  })

  const isLoading = avarageSpendsInMonth.isLoading || totalSpends.isLoading
  const isError = avarageSpendsInMonth.isError || totalSpends.isError

  if (isLoading) {
    return <Skeleton className="h-[182px] w-full" />
  }

  if (
    avarageSpendsInMonth.data === undefined ||
    totalSpends.data === undefined ||
    isError
  ) {
    return <ErrorCard />
  }

  const formattedAvarageSpendsInMonth = formatCurrency(
    avarageSpendsInMonth.data,
  )

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Общяя сумма трат</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {formatCurrency(totalSpends.data)}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <Icons.avg className="size-4" />
            {formattedAvarageSpendsInMonth}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium items-center">
          {formattedAvarageSpendsInMonth}
          <Icons.avg className="size-4" />
        </div>
        <div className="text-muted-foreground">В среднем трат за месяц</div>
      </CardFooter>
    </Card>
  )
}
