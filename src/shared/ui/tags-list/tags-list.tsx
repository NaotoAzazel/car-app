import { RecordTags } from '@prisma/client'
import { useTranslations } from 'next-intl'

import { getRecordTagsLabels } from '@/entities/record'

interface TagsListProps {
  tags: RecordTags[]
}

export function TagsList({ tags }: TagsListProps) {
  const tTags = useTranslations('RecordTags')
  const tagsLabels = getRecordTagsLabels(tTags)

  return (
    <div className="flex flex-wrap gap-1 max-w-max">
      {tags.map((tag) => (
        <div
          key={tag}
          className="h-8 px-3 border items-center rounded-md flex text-sm bg-input/20 whitespace-nowrap"
        >
          {tagsLabels[tag]}
        </div>
      ))}
    </div>
  )
}
