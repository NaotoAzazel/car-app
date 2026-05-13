'use client'

import { RecordSchema } from '@/entities/record'

import { AdditionalSpendsDialog } from '../additional-spends-dialog/additional-spends-dialog'
import { AdditionalSpendsList } from './additional-spends-list'

interface AdditionalSpendsContainerProps {
  value: RecordSchema['recordToAdditionalSpends']
  onChange: (additionalSpends: RecordSchema['recordToAdditionalSpends']) => void
  disabled: boolean
  recordId: number
}

export function AdditionalSpendsContainer({
  value,
  onChange,
  disabled,
  recordId,
}: AdditionalSpendsContainerProps) {
  const handleDelete = (spendId: number) => {
    const filtered = value.filter((item) => item.additionalSpendId !== spendId)
    onChange(filtered)
  }

  const handleAdd = (newSpend: any) => {
    const newEntry = {
      recordId: recordId,
      additionalSpendId: newSpend.id,
      additionalSpend: newSpend,
    }

    onChange([...value, newEntry])
  }

  return (
    <div className="flex flex-col rounded-md p-2 space-y-2 border bg-background justify-center">
      <AdditionalSpendsList additionalSpends={value} onDelete={handleDelete} />
      <AdditionalSpendsDialog recordId={recordId} disabled={disabled} onCreated={handleAdd} />
    </div>
  )
}
