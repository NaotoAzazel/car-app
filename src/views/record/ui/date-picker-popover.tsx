'use client'

import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { ControllerRenderProps } from 'react-hook-form'

import { RecordSchema } from '@/entities/record'
import { cn } from '@/shared/lib'
import {
  Button,
  Calendar,
  FormControl,
  Icons,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui'

interface DatePickerPopoverProps {
  field: ControllerRenderProps<RecordSchema, 'createdAt'>
  disabled: boolean
}

export function DatePickerPopover({ field, disabled }: DatePickerPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            disabled={disabled}
            variant="outline"
            className={cn(
              'pl-3 text-left font-normal',
              !field.value && 'text-muted-foreground',
            )}
          >
            {format(field.value, 'PPP', { locale: ru })}
            <Icons.calendar className="ml-auto size-4" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={ru}
          mode="single"
          selected={new Date(field.value)}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  )
}
