'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { tr } from 'date-fns/locale'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('record.overviewForm.additionalSpendsDialog')

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
      toast.success(t('additional-spend-added'))
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
          {t('add-additional-spend')}
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('dialog-title')}</DialogTitle>
            <DialogDescription>{t('dialog-description')}</DialogDescription>
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
                    <FormLabel>{t('name-field-label')}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder={t('name-field-placeholder')}
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
                    <FormLabel>{t('cost-field-label')}</FormLabel>
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
                    {t('cancel-button')}
                  </Button>
                </DialogClose>

                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Icons.loader className="mr-2 size-4 animate-spin" />
                  )}
                  <span>{t('save-button')}</span>
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
