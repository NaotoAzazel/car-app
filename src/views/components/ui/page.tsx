'use client'

import { useState } from 'react'

import { CreateComponentDialog } from '@/entities/component'
import { useDebounce } from '@/shared/lib'
import { Input, Title } from '@/shared/ui'

import { ComponentsList } from './components-list'

export function ComponentsPage() {
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearch = useDebounce<string>(searchValue, 1_000)

  return (
    <div className="grid items-start gap-4">
      <Title heading="Компоненты" />
      {/* TODO: add sort */}
      <div className="flex flex-col md:flex-row gap-2">
        <Input
          placeholder="Поиск по названию..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <CreateComponentDialog />
      </div>
      <ComponentsList searchValue={debouncedSearch} />
    </div>
  )
}
