'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { CreateComponentDialog } from '@/entities/component'
import { useDebounce } from '@/shared/lib'
import { Input, Title } from '@/shared/ui'

import { ComponentsList } from './components-list'

export function ComponentsPage() {
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearch = useDebounce<string>(searchValue, 1_000)

  const t = useTranslations('components')

  return (
    <div className="grid items-start gap-4">
      <Title heading={t('title')} />
      {/* TODO: add sort */}
      <div className="flex flex-col md:flex-row gap-2">
        <Input
          placeholder={t("search-placeholder")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <CreateComponentDialog />
      </div>
      <ComponentsList searchValue={debouncedSearch} />
    </div>
  )
}
