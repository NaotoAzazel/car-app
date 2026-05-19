'use client'

import { useTranslations } from 'next-intl'

import { useGetRecordById } from '@/entities/record'
import { Title } from '@/shared/ui'

import { ActionsDropdown } from './actions-dropdown/actions-dropdown'
import { RecordOverviewPageSkeleton } from './page-skeleton'
import { RecordOverviewForm } from './record-overview-form'

interface RecordOverviewPageProps {
  id: string
}

export function RecordOverviewPage({ id }: RecordOverviewPageProps) {
  const t = useTranslations('record.overviewPage')

  const { data, isLoading, isError } = useGetRecordById(Number(id))

  if (isLoading) {
    return <RecordOverviewPageSkeleton />
  }

  if (isError || !data) {
    return (
      <div className="flex w-full xl:w-1/3 items-center justify-center">
        <p className="text-destructive">{t('load-error')}</p>
      </div>
    )
  }

  return (
    <div className="grid items-start gap-4 w-full xl:w-1/3">
      <Title heading={t('title')}>
        <ActionsDropdown recordId={Number(id)} />
      </Title>
      <RecordOverviewForm record={data} />
    </div>
  )
}
