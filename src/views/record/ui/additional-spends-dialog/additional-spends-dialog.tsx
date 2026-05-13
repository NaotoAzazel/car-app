'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateAndLinkSpend } from '@/entities/additionalSpend'
import { additionalSpend, CreateAdditionalSpendSchema } from '@/entities/record'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
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

interface AdditionalSpendsDialogProps {
  recordId: number
  disabled: boolean
  onCreated: (spend: any) => void
}

export function AdditionalSpendsDialog({
  disabled,
  recordId,
  onCreated,
}: AdditionalSpendsDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const { mutateAsync: create, isPending } = useCreateAndLinkSpend()

  const form = useForm<CreateAdditionalSpendSchema>({
    resolver: zodResolver(additionalSpend.omit({ id: true })),
    defaultValues: { name: '', cost: 0 },
  })

  const onSubmit = async (data: CreateAdditionalSpendSchema) => {
    try {
      const newSpend = await create({ data, recordId })

      onCreated(newSpend)

      setIsDialogOpen(false)
      form.reset()
      toast.success('Доп. трата успешно добавлена')
    } catch (error) {
      console.error('AdditionalSpendsDialog', error)
    }
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
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавление дополнительной траты</DialogTitle>
            <DialogDescription>
              Заполните поля для добавление дополнительной траты
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              className="grid gap-2"
              onSubmit={(e) => {
                e.stopPropagation()
                form.handleSubmit(onSubmit)(e)
              }}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Установка на СТО"
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
                        placeholder="2450"
                        inputMode="numeric"
                        {...field}
                        disabled={isPending}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Отмена
                  </Button>
                </DialogClose>

                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Icons.loader className="mr-2 size-4 animate-spin" />
                  )}
                  <span>Сохранить</span>
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
