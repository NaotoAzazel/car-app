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

import { useCreateMileage } from '../../lib/'
import { createMileageSchema, CreateMileageSchema } from '../../model'
import { MileageInfoCard } from './mileage-info-card'

export function CreateMileageDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { create, isPending } = useCreateMileage()

  const form = useForm<CreateMileageSchema>({
    resolver: zodResolver(createMileageSchema),
    defaultValues: {
      mileage: 0,
    },
  })

  const onSubmit = async (data: CreateMileageSchema) => {
    try {
      toast.promise(create(data), {
        loading: 'Сохранение записи о пробеге...',
        success: () => `Пробег успешно записан`,
        error: 'Возникла ошибка при сохранении пробега, проверьте консоль',
      })
    } catch (error) {
      console.error('CreateMileageDialog', error)
    } finally {
      setIsOpen(false)
      form.reset()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="justify-start" variant="outline" size="sm">
          <Icons.gauge className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-1">
          <DialogTitle className="font-heading text-xl">
            Создание записи о пробеге
          </DialogTitle>
          <DialogDescription>
            Введите число текущего пробега для создания
          </DialogDescription>
        </DialogHeader>

        <MileageInfoCard isLoadTodayMileage={isOpen} />

        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="mileage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пробег (км)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="245447"
                      inputMode="numeric"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
