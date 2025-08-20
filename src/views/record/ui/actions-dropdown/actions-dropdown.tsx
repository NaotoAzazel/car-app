'use client'

import { Records } from '@prisma/client'
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
  recordId: Records['id']
}

export function ActionsDropdown({ recordId }: ActionsDropdownProps) {
  const { deleteRecordById, isPending } = useDeleteRecordById()

  const onRecordDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()

    try {
      toast.promise(deleteRecordById(recordId), {
        loading: 'Удаление записи...',
        success: () => `Запись была успешно удалена`,
        error: 'Возникла ошибка при удалении записи, проверьте консоль',
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
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
