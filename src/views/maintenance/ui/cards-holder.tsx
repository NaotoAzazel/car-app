'use client'

import { useTranslations } from 'next-intl'

import { useGetLatestMileage } from '@/entities/mileage'
import { formatDate } from '@/shared/lib'
import { Icons } from '@/shared/ui'

import { recordTagsGrouped } from '../lib'
import { ItemSection } from './item-section'
import { LazySection } from './lazy-section'
import { MaintenanceCard } from './maintenance-card/maintenance-card'

export function CardsHolder() {
  const t = useTranslations('maintenance.cardsHolder')

  const { data, isLoading, isError } = useGetLatestMileage()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center my-20">
        <Icons.loader className="size-4 animate-spin mr-2" />
        <span>{t('loading')}</span>
      </div>
    )
  }

  if (isError || !data?.length) {
    return (
      <div className="flex items-center justify-center my-20">
        <span className="text-destructive">{t('load-error')}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row p-1 gap-1 border rounded-md bg-input/30 w-full max-w-md">
        <div className="flex flex-row items-center bg-input/50 gap-2 p-1 px-2 rounded-md border">
          <Icons.gauge className="size-4" />
          <span className="text-sm">{data[0].mileage}</span>
        </div>
        <div className="flex flex-row items-center bg-input/50 gap-2 p-1 px-2 rounded-md border">
          <Icons.calendar className="size-4" />
          <span className="text-sm">
            {formatDate(data[0].createdAt, { month: 'long' })}
          </span>
        </div>
      </div>
      <ItemSection title={t('engine-section-title')}>
        {recordTagsGrouped.engine.map((tag) => (
          <MaintenanceCard currMileage={data[0].mileage} key={tag} tag={tag} />
        ))}
      </ItemSection>
      <LazySection
        currMileage={data[0].mileage}
        title={t('suspension-section-title')}
        tags={recordTagsGrouped.suspension}
      />
      <LazySection
        currMileage={data[0].mileage}
        title={t('transmission-section-title')}
        tags={recordTagsGrouped.transmission}
      />
      <LazySection
        currMileage={data[0].mileage}
        title={t('salon-section-title')}
        tags={recordTagsGrouped.salon}
      />
      <LazySection
        currMileage={data[0].mileage}
        title={t('other-section-title')}
        tags={recordTagsGrouped.other}
      />
    </div>
  )
}
