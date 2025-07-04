'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
import { createRecordSchema, CreateRecordSchema } from '../model'

export function CreateRecordDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { create, isPending } = useCreateRecord()

  const form = useForm<CreateRecordSchema>({
    resolver: zodResolver(createRecordSchema),
    defaultValues: {
      title: '',
    },
  })

  const onSubmit = async (data: CreateRecordSchema) => {
    try {
      await create(data.title)
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
        <Button className="w-full justify-start" variant="outline">
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
