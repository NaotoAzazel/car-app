'use client'

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

import { useCreateRecordType } from '../lib/use-create-record-type'
import {
  createRecordTypeFormSchema,
  CreateRecordTypeFormSchema,
} from '../model'

interface CreateRecordTypeDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  showTrigger?: boolean
}

export function CreateRecordTypeDialog({
  open,
  onOpenChange,
  showTrigger = true,
}: CreateRecordTypeDialogProps) {
  const { create, isPending } = useCreateRecordType()

  const form = useForm<CreateRecordTypeFormSchema>({
    resolver: zodResolver(createRecordTypeFormSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data: CreateRecordTypeFormSchema) => {
    try {
      toast.promise(create(data.name), {
        success: () => {
          onOpenChange?.(false)
          form.reset()

          return `Тип записи успешно создан`
        },
        error: 'Возникла ошибка при создании типа записи, проверьте консоль',
      })
    } catch (error) {
      console.error('CreateRecordTypeDialog', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button>Добавить тип</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader className="gap-1">
          <DialogTitle className="font-heading text-xl">
            Создание типа записи
          </DialogTitle>
          <DialogDescription>
            Введите название типа записи для создания
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Ремонт"
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
