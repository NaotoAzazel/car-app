import { RecordOverviewPage } from '@/views/record'

interface RecordOverviewPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: RecordOverviewPageProps) {
  const { id } = await params
  return <RecordOverviewPage id={id} />
}
