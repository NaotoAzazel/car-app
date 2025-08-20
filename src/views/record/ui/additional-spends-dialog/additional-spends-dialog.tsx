'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  additionalSpendsSchema,
  AdditionalSpendsSchema,
} from '@/entities/record'
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
  Input,
} from '@/shared/ui'

interface AdditionalSpendsDialogProps {
  onConfirm: (additionalSpends: AdditionalSpendsSchema) => void
  arrayLength: number
  disabled: boolean
}

export function AdditionalSpendsDialog({
  onConfirm,
  arrayLength,
  disabled,
}: AdditionalSpendsDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const form = useForm<Omit<AdditionalSpendsSchema, 'id'>>({
    resolver: zodResolver(additionalSpendsSchema.omit({ id: true })),
    defaultValues: {
      name: '',
      cost: 0,
    },
  })

  const onSubmit = async (data: Omit<AdditionalSpendsSchema, 'id'>) => {
    onConfirm({ ...data, id: arrayLength + 1 })
    setIsDialogOpen(false)

    form.reset()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          type="button"
          className="w-full"
        >
          Добавить
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление дополнительной траты</DialogTitle>
          <DialogDescription>
            Заполните поля для добавление дополнительной траты
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="additional-spends-form"
            className="grid gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Установка на СТО" {...field} />
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
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Отмена</Button>
              </DialogClose>
              <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                Добавить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
