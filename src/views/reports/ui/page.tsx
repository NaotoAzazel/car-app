import { getYears } from '@/entities/record/api/actions'

import { ChartArea } from './chart/chart-area'
import { SectionCards } from './section-cards/section-cards'

export async function ReportsPage() {
  await getYears()

  return (
    <div className="flex flex-col gap-4">
      <SectionCards />
      <ChartArea />
    </div>
  )
}
