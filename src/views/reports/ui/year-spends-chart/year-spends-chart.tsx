'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
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

export const getChartConfig = (t: (key: string) => string) => {
  return {
    spend: {
      label: t('charts.spend'),
      color: 'var(--primary)',
    },
  } satisfies ChartConfig
}

interface YearSpendsChartProps {
  year: string | null
}

export function YearSpendsChart({ year }: YearSpendsChartProps) {
  const t = useTranslations('reports.year-spends-chart')
  const tMonths = useTranslations('months')

  const [selectedYear, setSelectedYear] = useState<string | null>(year)

  const { data, isLoading, isError } = useGetMonthsSpends(Number(selectedYear))
  const isDataMissing = !data?.length || year === null

  const tGlobal = useTranslations()
  const chartConfig = getChartConfig(tGlobal)

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />
  }

  if (isError || data === undefined) {
    return <ErrorCard />
  }

  const localizedData = data.map((item) => ({
    ...item,
    monthLabel: tMonths(String(item.month)),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('card-title')}</CardTitle>
        {!isDataMissing && selectedYear && (
          <>
            <CardDescription>
              {selectedYear} {t('selected-year')}
            </CardDescription>
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
            <p className="text-muted-foreground">{t('no-data')}</p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[400px] w-full"
          >
            <AreaChart data={localizedData}>
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
                dataKey="monthLabel"
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
