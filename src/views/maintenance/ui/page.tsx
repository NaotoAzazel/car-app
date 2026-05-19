import { useTranslations } from 'next-intl'

import { Title } from '@/shared/ui'

import { CardsHolder } from './cards-holder'

export function MaintenancePage() {
  const t = useTranslations('maintenance')

  return (
    <div className="grid items-start gap-4 md:w-1/2">
      <Title heading={t('title')} />
      <CardsHolder />
    </div>
  )
}
