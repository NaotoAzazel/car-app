import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui'

export function ErrorCard() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Возникла ошибка</CardDescription>
        <CardTitle className="flex font-medium text-lg text-destructive tabular-nums">
          Не удалось загрузить данные
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
