'use client'

import { useGetRecordById } from '@/entities/record'
import { Title } from '@/shared/ui'

import { RecordOverviewForm } from './record-overview-form'

interface RecordOverviewPageProps {
  id: string
}

export function RecordOverviewPage({ id }: RecordOverviewPageProps) {
  const { data, isLoading, isError } = useGetRecordById(Number(id))

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError || !data) {
    return <p>error</p>
  }

  return (
    <div className="grid items-start gap-4">
      <Title heading="Редактирование записи" />
      <RecordOverviewForm record={data} />
    </div>
  )
}
