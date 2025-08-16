'use client'

import { useState } from 'react'
import { RecordTags } from '@prisma/client'

import { recordTagsRu } from '@/entities/record'
import { cn, useDebounce } from '@/shared/lib'
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  ScrollArea,
} from '@/shared/ui'

import { ListItem } from '../list-item'

interface TagsDialogProps {
  onConfirm: (tags: RecordTags[]) => void
  onOpenChange: (isOpen: boolean) => void
  isOpen: boolean
  initiallySelected?: RecordTags[]
}

export function TagsDialog({
  onConfirm,
  onOpenChange,
  isOpen,
  initiallySelected,
}: TagsDialogProps) {
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearch = useDebounce<string>(searchValue, 300)

  const [selected, setSelected] = useState<RecordTags[]>(
    initiallySelected ?? [],
  )

  const tagsEntries = Object.entries(recordTagsRu) as [RecordTags, string][]

  const filteredTags = tagsEntries.filter(([, value]) =>
    value.toLowerCase().includes(debouncedSearch.toLowerCase()),
  )

  const toggleSelect = (selectedTag: RecordTags) => {
    setSelected((prev) => {
      const isSelected = prev.includes(selectedTag)
      return isSelected
        ? prev.filter((tag) => tag !== selectedTag)
        : [...prev, selectedTag]
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogHeader>
            <DialogTitle>Выбор тэгов</DialogTitle>
          </DialogHeader>
        </DialogHeader>

        <div className="grid gap-2">
          <Input
            placeholder="Поиск..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <ScrollArea className="h-64 w-full" type="always">
            {filteredTags.map(([tag, label]) => (
              <ListItem
                key={tag}
                className={cn(
                  'hover:cursor-pointer hover:bg-accent duration-200 mt-1',
                  selected.includes(tag) && 'bg-accent',
                )}
                onClick={() => toggleSelect(tag)}
              >
                <p className="flex-1 break-words">{label}</p>
              </ListItem>
            ))}
          </ScrollArea>

          <Button
            className="w-full mt-4"
            type="button"
            onClick={() => {
              onConfirm(selected)
              onOpenChange(false)
            }}
          >
            Применить изменения
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
