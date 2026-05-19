'use client'

import { useState } from 'react'
import { RecordTags } from '@prisma/client'
import { useTranslations } from 'next-intl'

import { Button, TagsList } from '@/shared/ui'

import { TagsDialog } from '../tags-dialog/tags-dialog'

interface TagsContainerProps {
  value: RecordTags[]
  onChange: (components: RecordTags[]) => void
  disabled: boolean
}

export function TagsContainer({
  value,
  onChange,
  disabled,
}: TagsContainerProps) {
  const t = useTranslations('record.overviewForm.tagsContainer')

  const [isTagsDialogOpen, setIsTagsDialogOpen] = useState<boolean>(false)

  const onConfirm = (selectedTags: RecordTags[]) => {
    onChange(selectedTags)
  }

  return (
    <>
      <div className="flex flex-col rounded-md p-2 space-y-2 border bg-background justify-center">
        {value.length ? (
          <TagsList tags={value} />
        ) : (
          <div className="flex items-center justify-center">
            <span className="text-sm text-muted-foreground py-10">
              {t('tags-empty')}
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
          {t('add-button')}
        </Button>
      </div>

      <TagsDialog
        isOpen={isTagsDialogOpen}
        onOpenChange={setIsTagsDialogOpen}
        initiallySelected={value}
        onConfirm={(selectedTags) => onConfirm(selectedTags)}
      />
    </>
  )
}
