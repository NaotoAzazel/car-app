'use client'

import { useState } from 'react'
import { format, startOfMonth } from 'date-fns'
import { ru } from 'date-fns/locale'
import { DateRange } from 'react-day-picker'

import {
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icons,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui'

import { useGetMileageByDateRange } from '../../lib'
import { isSameRange } from './content-item/libs'
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

        <Popover
          open={isCalendarOpen}
          onOpenChange={(isOpen) => {
            setIsCalendarOpen(isOpen)

            if (!isOpen && !isSameRange(draftRange, appliedRange)) {
              setAppliedRange(draftRange)
            }
          }}
        >
          <PopoverTrigger asChild>
            <Button variant="outline" className="pl-3 text-left font-normal">
              {draftRange?.from && draftRange?.to ? (
                <>
                  {format(draftRange.from, 'PPP', { locale: ru })} -{' '}
                  {format(draftRange.to, 'PPP', { locale: ru })}
                </>
              ) : (
                <span>Выберите диапазон</span>
              )}
              <Icons.calendar className="ml-auto size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              locale={ru}
              mode="range"
              selected={draftRange}
              onSelect={setDraftRange}
              disabled={(date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
              required
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
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
