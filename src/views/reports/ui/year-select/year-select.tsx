'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import {
  getYears,
  RECORD_BASE_QUERY_KEY,
  YEARS_WITH_DATA,
} from '@/entities/record'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/shared/ui'

import { YearSelectItems } from './year-select-items'

interface YearSelectProps {
  selectedYear: string
  setSelectedYear: (year: string) => void
  enabled: boolean
}

export function YearSelect({
  selectedYear,
  setSelectedYear,
  enabled,
}: YearSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data, isLoading, isError, isFetched, refetch } = useQuery({
    queryFn: async () => await getYears(),
    queryKey: [RECORD_BASE_QUERY_KEY, YEARS_WITH_DATA],
    enabled: enabled && isOpen,
  })

  useEffect(() => {
    if (isOpen && !isFetched) {
      refetch()
    }
  }, [isOpen, setIsOpen])

  const yearsToString = data?.map((year) => year.toString()) ?? []

  const options = yearsToString.includes(selectedYear)
    ? yearsToString
    : [selectedYear, ...yearsToString]

  return (
    <Select
      open={isOpen}
      onOpenChange={setIsOpen}
      value={selectedYear}
      onValueChange={setSelectedYear}
      defaultValue={selectedYear}
      disabled={isLoading}
    >
      <SelectTrigger
        className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
        size="sm"
        aria-label="Select a value"
      >
        <SelectValue placeholder="Без данных" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <YearSelectItems
          years={options}
          isLoading={isLoading}
          isError={isError}
        />
      </SelectContent>
    </Select>
  )
}
