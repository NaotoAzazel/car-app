import { CurrentMonthAddedRecordsCard } from './current-month-added-records-card'
import { CurrentMonthSpendsCard } from './current-month-spends-card'
import { CurrentYearSpendsCard } from './current-year-spends-card'
import { TotalSpendsCard } from './total-spends-card'

export function SectionCards() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      <TotalSpendsCard />
      <CurrentYearSpendsCard />
      <CurrentMonthSpendsCard />
      <CurrentMonthAddedRecordsCard />
    </div>
  )
}
