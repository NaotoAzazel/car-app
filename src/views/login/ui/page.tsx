'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

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
  LangSelect,
} from '@/shared/ui'

import { loginSchema, LoginSchema } from '../lib/validation-schema'

export function LoginPage() {
  const router = useRouter()
  const t = useTranslations('login-page')

  const { mutate, isPending } = useMutation({
    mutationFn: async (password: string) => {
      await axios.post('/api/login', { password })
    },
    onSuccess: () => {
      toast.success(t('authorization-success'))
      router.replace('/')
    },
    onError: () => toast.error(t('incorrect-data')),
  })

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = async (data: LoginSchema) => {
    mutate(data.password)
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col gap-8 items-center justify-center">
        <p className="font-heading font-bold text-3xl">{t('title')}</p>
        <Form {...form}>
          <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('password-field')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Icons.loader className="mr-1 size-4 animate-spin" />
              ) : (
                <Icons.login className="mr-1 size-4" />
              )}
              {t('continue-button')}
            </Button>
            <LangSelect />
          </form>
        </Form>
      </div>
    </div>
  )
}
