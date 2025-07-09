'use client'

import { RecordTypes } from '@prisma/client'

import { Icons, SelectItem } from '@/shared/ui'

interface RecordTypeSelectContentProps {
  data: RecordTypes[]
  isLoading: boolean
  isError: boolean
}

export function RecordTypeSelectContent({
  data,
  isLoading,
  isError,
}: RecordTypeSelectContentProps) {
  if (isLoading) {
    return (
      <div className="flex flex-row items-center justify-center text-muted-foreground h-10">
        <Icons.loader className="size-4 mr-2 animate-spin" />
        <span className="text-sm">Загрузка...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center text-destructive h-10">
        <span className="text-sm">Ошибка загруки типов</span>
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="flex items-center justify-center text-muted-foreground h-10">
        <span className="text-sm">Типов записи не найдено</span>
      </div>
    )
  }

  return (
    <>
      {data?.map((recordType) => (
        <SelectItem key={recordType.id} value={String(recordType.id)}>
          {recordType.name}
        </SelectItem>
      ))}
    </>
  )
}
