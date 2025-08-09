'use client'

import { Records } from '@prisma/client'

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
          onClick={async (e) => {
            e.preventDefault()
            await deleteRecordById(recordId)
          }}
        >
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
