'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  getRecordById,
  recordSchema,
  RecordSchema,
  RecordsComponentWithData,
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
  const { update, isPending } = useUpdateRecordById()

  const form = useForm<RecordSchema>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      ...record,
      components: record?.RecordsComponents,
    },
  })

  const onSubmit = async (data: RecordSchema) => {
    try {
      toast.promise(update({ id: record!.id, ...data }), {
        success: () => `Запись была успешно сохранена`,
        error: 'Возникла ошибка при сохранении записи, проверьте консоль',
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
        <FormSection title="Название и тип">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">Название</FormLabel>
                <FormControl>
                  <Input
                    className="h-10"
                    disabled={isPending}
                    placeholder="Замена масла, масляного фильтра"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recordType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">Тип</FormLabel>
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
        <FormSection title="Компоненты, дополнительные траты, тэги">
          <FormField
            control={form.control}
            name="components"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">
                  Компоненты
                </FormLabel>
                <FormControl>
                  <ComponentsContainer
                    recordId={record!.id}
                    value={field.value as RecordsComponentWithData[]}
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
            name="additionalSpends"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">
                  Дополнительные траты
                </FormLabel>
                <FormControl>
                  <AdditionalSpendsContainer
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
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">Тэги</FormLabel>
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
        <FormSection title="Дата создания и пробег">
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">
                  Дата создания
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
                  Пробег (километры)
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
          <span>Сохранить</span>
        </Button>
      </form>
    </Form>
  )
}
