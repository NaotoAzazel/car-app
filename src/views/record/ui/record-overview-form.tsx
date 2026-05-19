'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  getRecordById,
  recordSchema,
  RecordSchema,
  useUpdateRecordById,
} from '@/entities/record'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  Input,
} from '@/shared/ui'

import { AdditionalSpendsContainer } from './additional-spends-container/additional-spends-container'
import { ComponentsContainer } from './components-container/components-container'
import { DatePickerPopover } from './date-picker-popover'
import { FormSection } from './form-section'
import { InsertCurrentMileageButton } from './insert-current-mileage-button'
import { RecordTypeSelect } from './record-type-select/record-type-select'
import { TagsContainer } from './tags-container/tags-container'

interface RecordOverviewFormProps {
  record: Awaited<ReturnType<typeof getRecordById>>
}

export function RecordOverviewForm({ record }: RecordOverviewFormProps) {
  const t = useTranslations('record.overviewForm')

  const { update, isPending } = useUpdateRecordById()

  const form = useForm<RecordSchema>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      ...record,
      recordsToComponents: record?.recordsToComponents || [],
      recordToAdditionalSpends: record?.recordToAdditionalSpends || [],
    },
  })

  const onSubmit = async (data: RecordSchema) => {
    try {
      toast.promise(update({ id: record!.id, ...data }), {
        success: () => t('record-created-success'),
        error: () => t('record-created-error'),
      })
    } catch (error) {
      console.error('RecordOverviewForm', error)
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormSection title={t('name-and-type-form-section')}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">
                  {t('title-label')}
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-10"
                    disabled={isPending}
                    placeholder={t('title-field-placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recordTypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">
                  {t('record-type-label')}
                </FormLabel>
                <FormControl>
                  <RecordTypeSelect
                    field={field}
                    initialValue={record?.recordType ?? undefined}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>
        <FormSection title={t('components-additional-spends-tags-section')}>
          <FormField
            control={form.control}
            name="recordsToComponents"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">
                  {t('components-label')}
                </FormLabel>
                <FormControl>
                  <ComponentsContainer
                    recordId={record!.id}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recordToAdditionalSpends"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">
                  {t('additional-spends-label')}
                </FormLabel>
                <FormControl>
                  <AdditionalSpendsContainer
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                    recordId={record!.id}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">
                  {t('tags-label')}
                </FormLabel>
                <FormControl>
                  <TagsContainer
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>
        <FormSection title={t('createdAt-and-mileage-section')}>
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">
                  {t('createdAt-field-label')}
                </FormLabel>
                <DatePickerPopover disabled={isPending} field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mileage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">
                  {t('mileage-field-label')}
                </FormLabel>
                <Input
                  className="h-10"
                  disabled={isPending}
                  placeholder="122459"
                  inputMode="numeric"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value ?? ''}
                />
                <InsertCurrentMileageButton form={form} />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>
        <Button type="submit" disabled={isPending}>
          {isPending && <Icons.loader className="mr-2 size-4 animate-spin" />}
          <span>{t('save-changes')}</span>
        </Button>
      </form>
    </Form>
  )
}
