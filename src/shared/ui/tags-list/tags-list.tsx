import { TagsSchema } from '@/entities/record'

interface TagsListProps {
  tags: TagsSchema[]
}

export function TagsList({ tags }: TagsListProps) {
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
