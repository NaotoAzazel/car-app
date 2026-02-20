'use client'

import { useState } from 'react'
import { startOfMonth } from 'date-fns'
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
        <Button variant="secondary">История пробега</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-1">
          <DialogTitle className="font-heading text-xl">
            История пробега
          </DialogTitle>
          <DialogDescription>
            Здесь отображаются записи о пробеге
          </DialogDescription>
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
