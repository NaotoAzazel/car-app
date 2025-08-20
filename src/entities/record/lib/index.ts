export {
  RECORD_BASE_QUERY_KEY,
  TOTAL_SPENDS,
  AVARAGE_SPENDS_IN_MONTH,
  YEARS_WITH_DATA,
} from './query-keys'
export { useCreateRecord } from './use-create-record'
export { useGetRecordById } from './use-get-record-by-id'
export { useUpdateRecordById } from './use-update-record-by-id'
export { useGetRecords } from './use-get-records'

export { useGetRecordsCountByMonth } from './use-get-records-count-by-month'
export { useGetSpendsByMonthYear } from './use-get-spends-by-month-and-year'
export { useGetSpendsByYear } from './use-get-spends-by-year'
export { useGetMonthsSpends } from './use-get-monts-spends'

export { type RecordTypesRuKeys, recordTypesRu } from './record-types'
export { recordTagsRu } from './record-tags'
export { useGetLatestRecordByTag } from './use-get-latest-record-by-tag'
