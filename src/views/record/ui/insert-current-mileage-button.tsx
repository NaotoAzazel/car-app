'use client'

import { UseFormReturn } from 'react-hook-form'

import { useGetLatestMileage } from '@/entities/mileage'
import { RecordSchema } from '@/entities/record'
import { Button, Icons } from '@/shared/ui'

interface InsertCurrentMileageButtonProps {
  form: UseFormReturn<RecordSchema>
}

export function InsertCurrentMileageButton({
  form,
}: InsertCurrentMileageButtonProps) {
  const { data, isError, isLoading } = useGetLatestMileage()

  if (isLoading) {
    return (
      <Button disabled variant="secondary">
        <Icons.loader className="size-4 animate-spin" />
        Загрузка записей о пробеге...
      </Button>
    )
  }

  if (isError) {
    return (
      <Button disabled variant="destructive">
        Ошибка загрузки записей о пробеге
      </Button>
    )
  }

  if (!data?.length) {
    return (
      <Button disabled variant="secondary">
        Не удалось найти записи о пробеге
      </Button>
    )
  }

  return (
    <Button
      variant="secondary"
      onClick={() => form.setValue('mileage', data[0].mileage)}
      type="button"
    >
      Вставить текущий пробег ({data[0].mileage})
    </Button>
  )
}
