import { Title } from '@/shared/ui'

import { CardsHolder } from './cards-holder'

export function MaintenancePage() {
  return (
    <div className="grid items-start gap-4 md:w-1/2">
      <Title heading="Обслуживание" />
      <CardsHolder />
    </div>
  )
}
