'use client'

import Link from 'next/link'

import { ComponentsSchema, TagsSchema } from '@/entities/record'
import { redirects } from '@/shared/constants'
import { formatCurrency, formatDate } from '@/shared/lib'
import { TagsList } from '@/shared/ui'

interface RecordListItemProps {
  recordId: number
  title: string
  type: string | undefined
  tags: TagsSchema[]
  components: ComponentsSchema[]
  createdAt: Date
}

export function RecordListItem({
  recordId,
  title,
  type,
  tags,
  components,
  createdAt,
}: RecordListItemProps) {
  const totalCost = components.reduce((sum, component) => {
    return sum + component.component.cost
  }, 0)

  return (
    <Link
      href={`${redirects.toRecordOverviewPage}/${recordId}`}
      className="border rounded-md p-4 hover:bg-input/30 hover:border-primary/50 duration-200 flex flex-col space-y-2"
    >
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{type ?? 'Тип не указан'}</span>
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
        <p className="text-muted-foreground text-sm">Тэги не добавлены</p>
      )}
    </Link>
  )
}
