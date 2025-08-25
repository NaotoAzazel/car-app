'use client'

import { Button, Label, Skeleton, Title } from '@/shared/ui'

import { FormSection } from './form-section'

export function RecordOverviewPageSkeleton() {
  return (
    <div className="grid items-start gap-4 w-full xl:w-1/3">
      <Title heading="Редактирование записи" />
      <div className="flex flex-col space-y-8">
        <FormSection title="Название и тип">
          <FormItem label="Название">
            <Skeleton className="w-full h-10" />
          </FormItem>
          <FormItem label="Тип">
            <Skeleton className="w-full h-10" />
          </FormItem>
        </FormSection>
        <FormSection title="Компоненты, дополнительные траты, тэги">
          <FormItem label="Компоненты">
            <Skeleton className="w-full h-[160px]" />
          </FormItem>
          <FormItem label="Дополнительные траты">
            <Skeleton className="w-full h-[160px]" />
          </FormItem>
          <FormItem label="Тэги">
            <Skeleton className="w-full h-[160px]" />
          </FormItem>
        </FormSection>
        <FormSection title="Дата создания и пробег">
          <FormItem label="Дата создания">
            <Skeleton className="w-full h-10" />
          </FormItem>
          <FormItem label="Пробег (километры)">
            <Skeleton className="w-full h-10" />
            <Button disabled variant="secondary">
              Вставить текущий пробег (??????)
            </Button>
          </FormItem>
        </FormSection>
        <Button disabled>Сохранить</Button>
      </div>
    </div>
  )
}

interface FormItemProps {
  label: string
  children: React.ReactNode
}

function FormItem({ label, children }: FormItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-lg font-heading">{label}</Label>
      {children}
    </div>
  )
}
