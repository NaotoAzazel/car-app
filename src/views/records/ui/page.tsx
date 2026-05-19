'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { useDebounce } from '@/shared/lib'
import { Input, Title } from '@/shared/ui'

import { RecordsList } from './records-list/records-list'

export function RecordsPage() {
  const t = useTranslations('records')

  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearch = useDebounce<string>(searchValue, 1_000)

  return (
    <div className="grid items-start gap-4">
      <Title heading={t('title')} />
      <div className="flex w-full flex-col space-y-4">
        {/* TODO: add sort */}
        <Input
          placeholder={t('search-input-placeholder')}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <RecordsList searchValue={debouncedSearch} />
      </div>
    </div>
  )
}
