'use client'

import { AdditionalSpendsSchema } from '@/entities/record'

import { AdditionalSpendsDialog } from '../additional-spends-dialog/additional-spends-dialog'
import { AdditionalSpendsList } from './additional-spends-list'

interface AdditionalSpendsContainerProps {
  value: AdditionalSpendsSchema[]
  onChange: (additionalSpends: AdditionalSpendsSchema[]) => void
  disabled: boolean
}

export function AdditionalSpendsContainer({
  value,
  onChange,
  disabled,
}: AdditionalSpendsContainerProps) {
  const handleAdd = (additionalSpends: AdditionalSpendsSchema) => {
    onChange([...value, additionalSpends])
  }

  const handleDelete = (id: number) => {
    const filtered = value.filter((item) => item.id !== id)
    onChange(filtered)
  }

  return (
    <div className="flex flex-col rounded-md p-2 space-y-2 border bg-background justify-center">
      <AdditionalSpendsList additionalSpends={value} onDelete={handleDelete} />
      <AdditionalSpendsDialog
        onConfirm={handleAdd}
        arrayLength={value.length}
        disabled={disabled}
      />
    </div>
  )
}
