import { TagsSchema } from '@/entities/record'

interface TagsListProps {
  tags: TagsSchema[]
}

export function TagsList({ tags }: TagsListProps) {
  if (tags.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <span className="text-sm text-muted-foreground py-10">
          Тэги не добавлены
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-1 max-w-max">
      {tags?.map((tag) => (
        <div
          key={tag.tag.id}
          className="h-8 px-3 border items-center rounded-md flex text-sm bg-input/20 whitespace-nowrap"
        >
          {tag.tag.name}
        </div>
      ))}
    </div>
  )
}
