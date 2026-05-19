'use client'

import { useTranslations } from 'next-intl'
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
  const t = useTranslations('record.overviewForm.insertCurrentMileageButton')

  const { data, isError, isLoading } = useGetLatestMileage()

  if (isLoading) {
    return (
      <Button disabled variant="secondary">
        <Icons.loader className="size-4 animate-spin" />
        {t('loading')}
      </Button>
    )
  }

  if (isError) {
    return (
      <Button disabled variant="destructive">
        {t('error')}
      </Button>
    )
  }

  if (!data?.length) {
    return (
      <Button disabled variant="secondary">
        {t('noRecords')}
      </Button>
    )
  }

  return (
    <Button
      variant="secondary"
      onClick={() => form.setValue('mileage', data[0].mileage)}
      type="button"
    >
      {t('insertCurrentMileage')} ({data[0].mileage})
    </Button>
  )
}
