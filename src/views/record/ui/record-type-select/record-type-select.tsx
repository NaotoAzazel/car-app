'use client'

import { useEffect, useState } from 'react'
import { RecordTypes } from '@prisma/client'
import { ControllerRenderProps } from 'react-hook-form'

import { RecordSchema, useGetRecordTypes } from '@/entities/record'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/shared/ui'

import { RecordTypeSelectContent } from './record-type-select-content'

interface RecordTypeSelectProps {
  field: ControllerRenderProps<RecordSchema, 'recordTypeId'>
  initialValue?: RecordTypes[]
  disabled: boolean
}

export function RecordTypeSelect({
  field,
  initialValue,
  disabled,
}: RecordTypeSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data, isLoading, isError, isFetched, refetch } = useGetRecordTypes()

  useEffect(() => {
    if (isOpen && !isFetched) {
      refetch()
    }
  }, [isOpen, setIsOpen])

  // make this shit below for display placeholder
  // in <SelectValue> when nothing  has been chosen.
  const selectValue =
    field.value !== null && field.value !== undefined ? String(field.value) : ''

  return (
    <Select
      open={isOpen}
      onOpenChange={setIsOpen}
      onValueChange={(val) => {
        field.onChange(val ? Number(val) : null)
      }}
      value={selectValue}
    >
      <SelectTrigger className="w-full" disabled={isLoading || disabled}>
        <SelectValue placeholder="Не выбрано" />
      </SelectTrigger>
      <SelectContent>
        <RecordTypeSelectContent
          data={(data as RecordTypes[]) ?? initialValue}
          isLoading={isLoading}
          isError={isError}
        />
      </SelectContent>
    </Select>
  )
}
