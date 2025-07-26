'use client'

import { useState } from 'react'
import { Tags } from '@prisma/client'

import { TagsSchema } from '@/entities/record'
import { Button, TagsList } from '@/shared/ui'

import { TagsDialog } from '../tags-dialog/tags-dialog'

interface TagsContainerProps {
  recordId: number
  value: TagsSchema[]
  onChange: (components: TagsSchema[]) => void
  disabled: boolean
}

export function TagsContainer({
  recordId,
  value,
  onChange,
  disabled,
}: TagsContainerProps) {
  const [isTagsDialogOpen, setIsTagsDialogOpen] = useState<boolean>(false)

  const onConfirm = (selectedTags: Tags[]) => {
    const newList = selectedTags.map((tag) => ({
      recordId,
      tagId: tag.id,
      tag,
    }))
    onChange(newList)
  }

  return (
    <>
      <div className="flex flex-col rounded-md p-2 space-y-2 border bg-background justify-center">
        {value.length ? (
          <TagsList tags={value} />
        ) : (
          <div className="flex items-center justify-center">
            <span className="text-sm text-muted-foreground py-10">
              Тэги не добавлены
            </span>
          </div>
        )}
        <Button
          variant="outline"
          onClick={() => setIsTagsDialogOpen(true)}
          type="button"
          className="w-full"
          disabled={disabled}
        >
          Добавить
        </Button>
      </div>

      <TagsDialog
        isOpen={isTagsDialogOpen}
        onOpenChange={setIsTagsDialogOpen}
        initiallySelected={value?.map((rt) => rt.tag)}
        onConfirm={(selectedTags) => onConfirm(selectedTags)}
      />
    </>
  )
}
