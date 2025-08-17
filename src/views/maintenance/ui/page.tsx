'use client'

import { recordTagsGrouped } from '@/entities/record'
import { Title } from '@/shared/ui'

import { ItemSection } from './item-section'
import { LazySection } from './lazy-section'
import { MaintenanceCard } from './maintenance-card/maintenance-card'

export function MaintenancePage() {
  return (
    <div className="grid items-start gap-4 md:w-1/2">
      <Title heading="Обслуживание" />
      <div className="flex flex-col gap-4">
        <ItemSection title="Двигатель">
          {recordTagsGrouped.engine.map((tag) => (
            <MaintenanceCard key={tag} tag={tag} />
          ))}
        </ItemSection>
        <LazySection title="Подвеска" tags={recordTagsGrouped.suspension} />
        <LazySection
          title="Трансмиссия"
          tags={recordTagsGrouped.transmission}
        />
        <LazySection title="Салон" tags={recordTagsGrouped.salon} />
        <LazySection title="Другое" tags={recordTagsGrouped.other} />
      </div>
    </div>
  )
}
