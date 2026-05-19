'use client'

import { Record } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { useDeleteRecordById } from '@/entities/record/lib/use-delete-record-by-id'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icons,
} from '@/shared/ui'

interface ActionsDropdownProps {
  recordId: Record['id']
}

export function ActionsDropdown({ recordId }: ActionsDropdownProps) {
  const t = useTranslations('record.overviewPage.actionsDropdown')

  const { deleteRecordById, isPending } = useDeleteRecordById()

  const onRecordDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()

    try {
      toast.promise(deleteRecordById(recordId), {
        loading: t('deleteing-record'),
        success: () => t('record-deleated'),
        error: t('create-record-error'),
      })
    } catch (error) {
      console.error('ActionsDropdown', error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isPending}>
          <Icons.alignJustify />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          variant="destructive"
          onClick={(e) => onRecordDelete(e)}
        >
          {t('delete-record')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
