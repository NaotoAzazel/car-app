import { useTranslations } from 'next-intl'

import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui'

export function ErrorCard() {
  const t = useTranslations('reports.error-card')

  return (
    <Card>
      <CardHeader>
        <CardDescription>{t('card-description')}</CardDescription>
        <CardTitle className="flex font-medium text-lg text-destructive tabular-nums">
          {t('card-title')}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
