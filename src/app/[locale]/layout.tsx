import { hasLocale } from 'next-intl'
import type { Metadata } from 'next'

import '@/shared/globals.css'

import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { cn, fontHeading, fontText } from '@/shared/lib'
import { Toaster } from '@/shared/ui'

import { Providers } from '../_providers'
import { routing } from '../../i18n/routing'

export const metadata: Metadata = {
  title: 'Машина',
  description: 'Statistic app for car',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className={cn(
          'relative h-full font-primary antialiased',
          fontHeading.variable,
          fontText.variable,
        )}
      >
        <Providers>
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  )
}
