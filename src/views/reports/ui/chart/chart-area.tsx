'use client'

import { useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { useGetMonthsSpends } from '@/entities/record'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Skeleton,
} from '@/shared/ui'

import { ErrorCard } from '../section-cards/error-card'
import { YearSelect } from '../year-select/year-select'

const chartConfig = {
  spend: {
    label: 'Потрачено',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

export function ChartArea() {
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString(),
  )

  const { data, isLoading, isError } = useGetMonthsSpends(Number(selectedYear))
  const isDataMissing = !data?.length

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />
  }

  if (isError || data === undefined) {
    return <ErrorCard />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>График трат</CardTitle>
        {!isDataMissing && (
          <>
            <CardDescription>{selectedYear} год</CardDescription>
            <CardAction>
              <YearSelect
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                enabled={!isDataMissing}
              />
            </CardAction>
          </>
        )}
      </CardHeader>
      <CardContent>
        {isDataMissing ? (
          <div className="h-[400px] w-full flex justify-center items-center">
            <p className="text-muted-foreground">Данные не найдены</p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[400px] w-full"
          >
            <AreaChart data={data}>
              <defs>
                <linearGradient id="fillSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-spend)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-spend)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="spend"
                type="monotone"
                fill="url(#fillSpend)"
                stroke="var(--color-spend)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
