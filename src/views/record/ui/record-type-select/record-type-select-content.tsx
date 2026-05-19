import { RecordType } from '@prisma/client'
import { useTranslations } from 'next-intl'

import { Button, Icons, SelectItem, SelectSeparator } from '@/shared/ui'

interface RecordTypeSelectContentProps {
  recordTypes: RecordType[] | undefined
  isLoading: boolean
  onAddNewType?: () => void
}

export function RecordTypeSelectContent({
  recordTypes,
  isLoading,
  onAddNewType,
}: RecordTypeSelectContentProps) {
  const t = useTranslations('maintenance.recordTypeSelect')

  const isEmpty = !isLoading && recordTypes?.length === 0

  if (isEmpty) {
    return (
      <div className="flex flex-col gap-2 py-3 items-center justify-center text-center">
        <div className="flex gap-1 flex-col">
          <p className="text-sm font-medium">{t('types-not-found')}</p>
          <p className="text-xs text-muted-foreground">
            {t('types-not-found-description')}
          </p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" onClick={onAddNewType}>
            {t('add-type')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {recordTypes?.map((type) => (
        <SelectItem key={type.id} value={type.id.toString()}>
          {type.name}
        </SelectItem>
      ))}
      <SelectSeparator />
      <Button
        onClick={(e) => {
          e.preventDefault()
          onAddNewType?.()
        }}
        variant="outline"
        className="w-full"
        size="sm"
      >
        <Icons.circlePlus className="size-4" />
        {t('add-type')}
      </Button>
    </>
  )
}
