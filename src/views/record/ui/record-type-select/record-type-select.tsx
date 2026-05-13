'use client'

import { useState } from 'react'
import { RecordType } from '@prisma/client'
import { ControllerRenderProps } from 'react-hook-form'

import { RecordSchema } from '@/entities/record'
import {
  CreateRecordTypeDialog,
  useGetRecordTypes,
} from '@/entities/record-type'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/shared/ui'

import { RecordTypeSelectContent } from './record-type-select-content'

interface RecordTypeSelectProps {
  field: ControllerRenderProps<RecordSchema, 'recordTypeId'>
  initialValue?: RecordType | null
  disabled: boolean
}

export function RecordTypeSelect({ field, disabled }: RecordTypeSelectProps) {
  const [isCreateTypeDialogOpen, setIsCreateTypeDialogOpen] = useState(false)

  const { data: recordTypes, isLoading, isError } = useGetRecordTypes()

  return (
    <>
      <Select
        value={field.value?.toString() || ''}
        onValueChange={(val) => {
          const numericValue = val === 'none' ? null : Number(val)
          field.onChange(numericValue)
        }}
        disabled={disabled || isLoading}
      >
        {isError ? (
          <SelectTrigger className="w-full" disabled>
            <SelectValue placeholder="Ошибка загрузки типов" />
          </SelectTrigger>
        ) : (
          <SelectTrigger className="w-full" disabled={disabled}>
            <SelectValue placeholder="Не выбрано" />
          </SelectTrigger>
        )}
        <SelectContent>
          <RecordTypeSelectContent
            recordTypes={recordTypes}
            isLoading={isLoading}
            onAddNewType={() => setIsCreateTypeDialogOpen(true)}
          />
        </SelectContent>
      </Select>

      <CreateRecordTypeDialog
        open={isCreateTypeDialogOpen}
        onOpenChange={setIsCreateTypeDialogOpen}
        showTrigger={false}
      />
    </>
  )
}
