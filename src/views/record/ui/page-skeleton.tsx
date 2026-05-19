'use client'

import { useTranslations } from 'next-intl'

import { Button, Label, Skeleton, Title } from '@/shared/ui'

import { FormSection } from './form-section'

export function RecordOverviewPageSkeleton() {
  const tPage = useTranslations('record.overviewPage')
  const tForm = useTranslations('record.overviewForm')
  const tMileage = useTranslations(
    'record.overviewForm.insertCurrentMileageButton',
  )

  return (
    <div className="grid items-start gap-4 w-full xl:w-1/3">
      <Title heading={tPage('title')} />
      <div className="flex flex-col space-y-8">
        <FormSection title={tForm('name-and-type-form-section')}>
          <FormItem label={tForm('title-label')}>
            <Skeleton className="w-full h-10" />
          </FormItem>
          <FormItem label={tForm('record-type-label')}>
            <Skeleton className="w-full h-10" />
          </FormItem>
        </FormSection>
        <FormSection title={tForm('components-additional-spends-tags-section')}>
          <FormItem label={tForm('components-label')}>
            <Skeleton className="w-full h-[160px]" />
          </FormItem>
          <FormItem label={tForm('additional-spends-label')}>
            <Skeleton className="w-full h-[160px]" />
          </FormItem>
          <FormItem label={tForm('tags-label')}>
            <Skeleton className="w-full h-[160px]" />
          </FormItem>
        </FormSection>
        <FormSection title={tForm('createdAt-and-mileage-section')}>
          <FormItem label={tForm('createdAt-field-label')}>
            <Skeleton className="w-full h-10" />
          </FormItem>
          <FormItem label={tForm('mileage-field-label')}>
            <Skeleton className="w-full h-10" />
            <Button disabled variant="secondary">
              {tMileage('insertCurrentMileage')} (??????)
            </Button>
          </FormItem>
        </FormSection>
        <Button disabled>{tForm('save-changes')}</Button>
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
