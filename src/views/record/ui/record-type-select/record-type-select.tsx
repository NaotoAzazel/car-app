'use client'

import { useState } from 'react'
import { RecordTypes } from '@prisma/client'
import { ControllerRenderProps } from 'react-hook-form'

import {
  RecordSchema,
  recordTypesRu,
  RecordTypesRuKeys,
} from '@/entities/record'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui'

interface RecordTypeSelectProps {
  field: ControllerRenderProps<RecordSchema, 'recordType'>
  initialValue?: RecordTypes
  disabled: boolean
}

export function RecordTypeSelect({
  initialValue,
  field,
  disabled,
}: RecordTypeSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Select
      value={field.value ? RecordTypes[field.value] : ''}
      onValueChange={(val) => field.onChange(val)}
      open={isOpen}
      onOpenChange={setIsOpen}
      defaultValue={initialValue}
    >
      <SelectTrigger className="w-full" disabled={disabled}>
        <SelectValue placeholder="Не выбрано" />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(recordTypesRu) as RecordTypesRuKeys[]).map((type) => (
          <SelectItem key={type} value={type}>
            {recordTypesRu[type]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
