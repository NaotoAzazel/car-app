'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icons,
} from '@/shared/ui'

export function LangSelect() {
  const t = useTranslations('lang-select-button')

  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (nextLocale: 'ru' | 'uk') => {
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Icons.globe className="h-[1.2rem] w-[1.2rem]" />
          <span>{t('button-trigger-text')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          className="cursor-pointer font-medium"
          disabled={locale === 'ru'}
          onClick={() => handleLanguageChange('ru')}
        >
          Русский
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer font-medium"
          disabled={locale === 'uk'}
          onClick={() => handleLanguageChange('uk')}
        >
          Українська
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
