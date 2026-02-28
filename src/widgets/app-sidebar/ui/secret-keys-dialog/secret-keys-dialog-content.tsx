import { Icons } from '@/shared/ui'

import { KeyField } from './key-field'

interface SecretKeysDialogContentProps {
  data: {
    API_BEARER_TOKEN: string
  }
  isLoading: boolean
  isError: boolean
}

export function SecretKeysDialogContent({
  data,
  isLoading,
  isError,
}: SecretKeysDialogContentProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-muted-foreground">
        <Icons.loader className="size-4 animate-spin" />
        <span className="ml-2 text-sm">Загрузка...</span>
      </div>
    )
  }

  if (isError) {
    return <div>Ошибка при загрузке ключей</div>
  }

  return (
    <div>
      <div className="flex gap-1 flex-col">
        <KeyField label="API Bearer Token" value={data.API_BEARER_TOKEN} />
      </div>
    </div>
  )
}
