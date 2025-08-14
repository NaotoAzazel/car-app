'use client'

import { Icons, SelectItem } from '@/shared/ui'

interface YearSelectItemsProps {
  isLoading: boolean
  isError: boolean
  years: string[]
}

export function YearSelectItems({
  isLoading,
  isError,
  years,
}: YearSelectItemsProps) {
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
        <span className="text-sm">Ошибка загруки</span>
      </div>
    )
  }

  return (
    <>
      {years.map((year) => (
        <SelectItem value={year} className="rounded-lg" key={year}>
          {year} год
        </SelectItem>
      ))}
    </>
  )
}
