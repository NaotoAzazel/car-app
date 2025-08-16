import { RecordTags } from '@prisma/client'

import { recordTagsRu } from '@/entities/record'

interface TagsListProps {
  tags: RecordTags[]
}

export function TagsList({ tags }: TagsListProps) {
  return (
    <div className="flex flex-wrap gap-1 max-w-max">
      {tags.map((tag) => (
        <div
          key={tag}
          className="h-8 px-3 border items-center rounded-md flex text-sm bg-input/20 whitespace-nowrap"
        >
          {recordTagsRu[tag]}
        </div>
      ))}
    </div>
  )
}
