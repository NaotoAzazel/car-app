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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  Input,
  Switch,
} from '@/shared/ui'

import { useCreateComponent } from '../lib'
import { createComponentSchema, CreateComponentSchema } from '../model'

export function CreateComponentDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { create, isPending } = useCreateComponent()

  const form = useForm<CreateComponentSchema>({
    resolver: zodResolver(createComponentSchema),
    defaultValues: {
      name: '',
      code: '',
      cost: '',
      isLiquid: false,
    },
  })

  const onSubmit = async (data: CreateComponentSchema) => {
    try {
      toast.promise(create(data), {
        loading: 'Создание компонента...',
        success: () => `Компонент был успешно создан`,
        error: 'Возникла ошибка при создании компонента, проверьте консоль',
      })
    } catch (error) {
      console.error('CreateComponentDialog', error)
    } finally {
      setIsOpen(false)
      form.reset()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Icons.circlePlus className="size-4" />
          Компонент
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление компонента</DialogTitle>
          <DialogDescription>
            Заполните данные, чтобы добавить новый компонент в систему
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Моторное масло Fuchs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена (грн)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="2450"
                      inputMode="numeric"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Код</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="0580454007"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isLiquid"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between border p-3 bg-input/30 rounded-md">
                  <div className="space-y-1">
                    <FormLabel>Жидкий компонент</FormLabel>
                    <FormDescription>
                      Укажите, если компонент представляет собой жидкость
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
