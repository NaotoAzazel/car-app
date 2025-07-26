'use client'

import { useState } from 'react'

import { useDebounce } from '@/shared/lib'
import { Input, Title } from '@/shared/ui'

import { RecordsList } from './records-list/records-list'

export function RecordsPage() {
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearch = useDebounce<string>(searchValue, 1_000)

  return (
    <div className="grid items-start gap-4">
      <Title heading="Записи" />
      <div className="flex w-full flex-col space-y-4">
        {/* TODO: add sort */}
        <Input
          placeholder="Поиск по названию..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <RecordsList searchValue={debouncedSearch} />
      </div>
    </div>
  )
}
