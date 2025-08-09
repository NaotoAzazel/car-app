'use client'

import { useGetRecordById } from '@/entities/record'
import { Title } from '@/shared/ui'

import { ActionsDropdown } from './actions-dropdown/actions-dropdown'
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
    <div className="grid items-start gap-4 w-full xl:w-1/3">
      <Title heading="Редактирование записи">
        <ActionsDropdown recordId={Number(id)} />
      </Title>
      <RecordOverviewForm record={data} />
    </div>
  )
}
