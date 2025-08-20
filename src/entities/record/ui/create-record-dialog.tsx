'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
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
        loading: 'Создание записи...',
        success: () => `Запись была успешно создана`,
        error: 'Возникла ошибка при создании записи, проверьте консоль',
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsOpen(false)
      form.reset()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="sm">
          Добавить запись
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-1">
          <DialogTitle className="font-heading text-xl">
            Создание записи
          </DialogTitle>
          <DialogDescription>
            Введите название записи для создания
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Замена масла, масляного фильтра"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isPending}>
                        Отмена
                      </Button>
                    </DialogClose>
                    <Button disabled={isPending} type="submit">
                      {isPending && (
                        <Icons.loader className="mr-2 size-4 animate-spin" />
                      )}
                      Создать
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
