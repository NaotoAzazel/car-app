'use client'

import { useState } from 'react'
import { startOfMonth } from 'date-fns'
import { useTranslations } from 'next-intl'
import { DateRange } from 'react-day-picker'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui'

import { useGetMileageByDateRange } from '../../lib'
import { DatePicker } from './date-picker/date-picker'
import { MileageHistoryDialogContent } from './mileage-history-dialog-content'

export function MileageHistoryDialog() {
  const t = useTranslations('mileage.history-dialog')

  const [draftRange, setDraftRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: new Date(),
  })

  const [appliedRange, setAppliedRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: new Date(),
  })

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)

  const { data, isError, isLoading, isRefetching, refetch } =
    useGetMileageByDateRange({
      enabled: Boolean(appliedRange.from && appliedRange.to),
      from: appliedRange.from,
      to: appliedRange.to,
    })

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">{t('mileage-history')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-1">
          <DialogTitle className="font-heading text-xl">
            {t('dialog-title')}
          </DialogTitle>
          <DialogDescription>{t('card-description')}</DialogDescription>
        </DialogHeader>

        <DatePicker
          draftRange={draftRange}
          setDraftRange={setDraftRange}
          appliedRange={appliedRange}
          setAppliedRange={setAppliedRange}
          isCalendarOpen={isCalendarOpen}
          setIsCalendarOpen={setIsCalendarOpen}
        />

        <MileageHistoryDialogContent
          data={data ?? []}
          isError={isError}
          isLoading={isLoading || isRefetching}
          refetch={refetch}
          setDraftRange={setDraftRange}
          setAppliedRange={setAppliedRange}
        />
      </DialogContent>
    </Dialog>
  )
}
