'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { Mileage } from '@prisma/client'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { DateRange } from 'react-day-picker'

import { Button, Icons, ScrollArea } from '@/shared/ui'

import { getLastMileageMonthRange } from '../../api'
import { ContentItem } from './content-item/content-item'
import { ContentItemSkeleton } from './content-item/content-item-skeleton'

interface MileageHistoryDialogContent {
  data: Mileage[]
  isError: boolean
  isLoading: boolean

  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<Mileage[], Error>>

  setDraftRange: Dispatch<SetStateAction<DateRange>>
  setAppliedRange: Dispatch<SetStateAction<DateRange>>
}

export function MileageHistoryDialogContent({
  data,
  isError,
  isLoading,
  refetch,
  setDraftRange,
  setAppliedRange,
}: MileageHistoryDialogContent) {
  const [isLocalLoading, setIsLocalLoading] = useState<boolean>(false)

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-3 rounded-lg border border-dashed bg-muted/30 px-4 text-center">
        <Icons.alertCircle className="size-8 text-muted-foreground" />

        <div className="space-y-1">
          <p className="text-md md:text-sm font-medium text-destructive">
            Возникла ошибка
          </p>
          <p className="text-sm md:text-xs text-muted-foreground">
            Возникла ошибка загрузки данных. Попробуйте перезагрузить страницу
            или обновить данные.
          </p>
        </div>

        <div className="flex gap-2 mt-1">
          <Button size="sm" onClick={() => refetch()} disabled={isLoading}>
            {isLoading && <Icons.loader className="size-4 mr-2" />}
            Обновить данные
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex gap-1 flex-col">
        <ContentItemSkeleton items={4} />
      </div>
    )
  }

  const handleShowLastMonthMileage = async () => {
    try {
      setIsLocalLoading(true)

      const { from, to } = await getLastMileageMonthRange()

      setAppliedRange({ from, to })
      setDraftRange({ from, to })
    } catch (error) {
      console.error('handleShowLastMonthMileage', error)
    } finally {
      setIsLocalLoading(false)
    }
  }

  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-3 rounded-lg border border-dashed bg-muted/30 px-4 text-center">
        <Icons.history className="size-8 text-muted-foreground" />

        <div className="space-y-1">
          <p className="text-sm font-medium">Записей о пробеге не найдено</p>
          <p className="text-xs text-muted-foreground">
            За выбранный период нет данных. Попробуйте изменить диапазон дат или
            показать последнюю неделю с записями.
          </p>
        </div>

        <div className="flex gap-2 mt-1">
          <Button
            size="sm"
            disabled={isLocalLoading}
            onClick={handleShowLastMonthMileage}
          >
            {isLocalLoading && (
              <Icons.loader className="size-4 mr-2 animate-spin" />
            )}
            Показать последний месяц
          </Button>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="h-auto max-h-72 w-full rounded-md" type="always">
      {data?.map((item, index) => {
        const prevItem = data[index - 1]
        const isFirst = index === 0

        const diff =
          !isFirst && prevItem ? item.mileage - prevItem.mileage : null

        return <ContentItem mileageItem={item} diff={diff} key={index} />
      })}
    </ScrollArea>
  )
}
