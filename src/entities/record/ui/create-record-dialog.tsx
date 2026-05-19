'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  Input,
} from '@/shared/ui'

import { useCreateRecord } from '../lib'
import { createRecordFormSchema, CreateRecordFormSchema } from '../model'

export function CreateRecordDialog() {
  const t = useTranslations('record.create-dialog')

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { create, isPending } = useCreateRecord()

  const form = useForm<CreateRecordFormSchema>({
    resolver: zodResolver(createRecordFormSchema),
    defaultValues: {
      title: '',
    },
  })

  const onSubmit = async (data: CreateRecordFormSchema) => {
    try {
      toast.promise(create(data.title), {
        success: () => {
          setIsOpen(false)
          form.reset()

          return t('record-created')
        },
        error: t('create-record-error'),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="sm">
          {t('add-record')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-1">
          <DialogTitle className="font-heading text-xl">
            {t('dialog-title')}
          </DialogTitle>
          <DialogDescription>{t('dialog-description')}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('title-field-label')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder={t('title-input-placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isPending}>
                        {t('cancel-button')}
                      </Button>
                    </DialogClose>
                    <Button disabled={isPending} type="submit">
                      {isPending && (
                        <Icons.loader className="mr-2 size-4 animate-spin" />
                      )}
                      {t('create-button')}
                    </Button>
                  </DialogFooter>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
