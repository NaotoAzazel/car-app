'use client'

import { useState } from 'react'
import {
  endOfMonth,
  endOfToday,
  endOfWeek,
  format,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns'
import { ru } from 'date-fns/locale'
import { DateRange } from 'react-day-picker'

import {
  Button,
  Calendar,
  Icons,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui'

import { isSameRange } from '../content-item/libs'
import { DiapasoneButton } from './diapasone-button'
import {
  DIAPASONE_BUTTONS,
  DIAPASONE_BUTTONS_VALUES,
} from './diapasone-buttons'

interface CalendarProps {
  draftRange: DateRange
  setDraftRange: (date: DateRange) => void

  appliedRange: DateRange
  setAppliedRange: (date: DateRange) => void

  isCalendarOpen: boolean
  setIsCalendarOpen: (isOpen: boolean) => void
}

export function DatePicker({
  appliedRange,
  draftRange,
  isCalendarOpen,
  setAppliedRange,
  setDraftRange,
  setIsCalendarOpen,
}: CalendarProps) {
  const [selectedDiapasone, setSelectedDiapasone] =
    useState<DIAPASONE_BUTTONS_VALUES | null>(
      DIAPASONE_BUTTONS_VALUES.THIS_MONTH,
    )

  function handleDiapasoneSelect(value: DIAPASONE_BUTTONS_VALUES) {
    const today = new Date()

    switch (value) {
      case DIAPASONE_BUTTONS_VALUES.TODAY: {
        setDraftRange({
          from: startOfToday(),
          to: endOfToday(),
        })
        break
      }

      case DIAPASONE_BUTTONS_VALUES.TODAY_AND_YESTERDAY: {
        setDraftRange({
          from: subDays(today, 1),
          to: endOfToday(),
        })
        break
      }

      case DIAPASONE_BUTTONS_VALUES.YESTERDAY: {
        setDraftRange({
          from: subDays(today, 1),
          to: subDays(today, 1),
        })
        break
      }

      case DIAPASONE_BUTTONS_VALUES.THIS_WEEK: {
        setDraftRange({
          from: startOfWeek(today, { weekStartsOn: 1 }),
          to: endOfWeek(today, { weekStartsOn: 1 }),
        })
        break
      }

      case DIAPASONE_BUTTONS_VALUES.LAST_WEEK: {
        const prevWeek = subWeeks(today, 1)
        setDraftRange({
          from: startOfWeek(prevWeek),
          to: endOfWeek(prevWeek),
        })

        break
      }

      case DIAPASONE_BUTTONS_VALUES.THIS_MONTH: {
        setDraftRange({
          from: startOfMonth(today),
          to: endOfMonth(today),
        })
        break
      }

      case DIAPASONE_BUTTONS_VALUES.LAST_MONTH: {
        const prevMonth = subMonths(today, 1)
        setDraftRange({
          from: startOfMonth(prevMonth),
          to: endOfMonth(prevMonth),
        })
        break
      }
    }
  }

  return (
    <Popover
      open={isCalendarOpen}
      onOpenChange={(isOpen) => {
        setIsCalendarOpen(isOpen)

        if (!isOpen && !isSameRange(draftRange, appliedRange)) {
          setAppliedRange(draftRange)
        }
      }}
      modal
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
      <PopoverContent
        className="h-[44vh] md:h-auto md:w-[calc(var(--radix-popover-trigger-width)+60px)] overflow-y-scroll md:overflow-y-hidden p-0 flex md:flex-row flex-col gap-4 md:gap-0"
        align="center"
      >
        <Calendar
          locale={ru}
          mode="range"
          selected={draftRange}
          onSelect={(range) => {
            setSelectedDiapasone(null)
            setDraftRange(range)
          }}
          disabled={(date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
          required
          captionLayout="dropdown"
          className="sm:w-full w-auto"
        />
        <div className="flex flex-col p-3 gap-2">
          <div className="flex flex-wrap gap-1 max-w-max">
            {DIAPASONE_BUTTONS.map((button) => (
              <DiapasoneButton
                key={button.value}
                title={button.title}
                isSelected={selectedDiapasone === button.value}
                onClick={() => {
                  setSelectedDiapasone(button.value)
                  handleDiapasoneSelect(button.value)
                }}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
