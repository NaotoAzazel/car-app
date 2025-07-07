'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { getRecordById, recordSchema, RecordSchema } from '@/entities/record'
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

import { ComponentsContainer } from './components-container/components-container'
import { DatePickerPopover } from './date-picker-popover'
import { FormSection } from './form-section'
import { RecordTypeSelect } from './record-type-select'

interface RecordOverviewFormProps {
  record: Awaited<ReturnType<typeof getRecordById>>
}

export function RecordOverviewForm({ record }: RecordOverviewFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<RecordSchema>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      ...record,
    },
  })

  const onSubmit = async (data: RecordSchema) => {
    setIsLoading(true)
    console.log(data)

    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full xl:w-1/3 flex-col space-y-8"
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
                    disabled={isLoading}
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
            name="recordTypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">Тип</FormLabel>
                <FormControl>
                  <RecordTypeSelect
                    field={field}
                    initialValue={record?.recordType ? [record.recordType] : []}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>
        <FormSection title="Компоненты">
          <ComponentsContainer
            recordId={record!.id}
            components={record?.RecordsComponents}
          />
        </FormSection>
        <FormSection title="Дата создания">
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-heading">
                  Дата создания
                </FormLabel>
                <DatePickerPopover disabled={isLoading} field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Icons.loader className="mr-2 size-4 animate-spin" />}
          <span>Сохранить</span>
        </Button>
      </form>
    </Form>
  )
}
