import { getLastYearWithData } from '@/entities/record'

import { SectionCards } from './section-cards/section-cards'
import { YearSpendsChart } from './year-spends-chart/year-spends-chart'

export async function ReportsPage() {
  const year = await getLastYearWithData()

  return (
    <div className="flex flex-col gap-4">
      <SectionCards />
      <YearSpendsChart year={year} />
    </div>
  )
}
