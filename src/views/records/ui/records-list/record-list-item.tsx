'use client'

import { Link } from '@/i18n/navigation'
import { RecordTags } from '@prisma/client'
import { useTranslations } from 'next-intl'

import { RecordSchema } from '@/entities/record'
import { redirects } from '@/shared/constants'
import { formatCurrency, formatDate } from '@/shared/lib'
import { TagsList } from '@/shared/ui'

interface RecordListItemProps {
  recordId: number
  title: string
  typeName: string | undefined
  tags: RecordTags[]
  components: RecordSchema['recordsToComponents']
  additionalSpends: RecordSchema['recordToAdditionalSpends']
  createdAt: Date
}

export function RecordListItem({
  recordId,
  title,
  typeName,
  tags,
  components,
  additionalSpends,
  createdAt,
}: RecordListItemProps) {
  const t = useTranslations('records.list.item')

  const totalComponentsCost = components.reduce(
    (sum, component) => sum + component.component.cost,
    0,
  )

  const totalAdditionalSpendsCost = additionalSpends.reduce(
    (sum, spend) => sum + spend.additionalSpend.cost,
    0,
  )

  const totalCost = totalComponentsCost + totalAdditionalSpendsCost

  if (!typeName) {
    typeName = t('type-not-found')
  }

  return (
    <Link
      href={`${redirects.toRecordOverviewPage}/${recordId}`}
      className="border rounded-md p-4 hover:bg-input/30 hover:border-primary/50 duration-200 flex flex-col space-y-2"
    >
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{typeName}</span>
        <span>{formatDate(createdAt)}</span>
      </div>

      <div className="flex justify-between items-center">
        <p className="flex-1 break-all font-heading font-semibold text-lg break-words">
          {title}
        </p>
        <span className="text-primary font-semibold whitespace-nowrap">
          {formatCurrency(totalCost ?? 0)}
        </span>
      </div>

      {tags.length ? (
        <TagsList tags={tags} />
      ) : (
        <p className="text-muted-foreground text-sm">{t('tags-empty')}</p>
      )}
    </Link>
  )
}
