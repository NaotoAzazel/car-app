import type { Metadata } from 'next'

import '@/shared/globals.css'

import { cn, fontHeading, fontText } from '@/shared/lib'
import { Toaster } from '@/shared/ui'

import { Providers } from './_providers'

export const metadata: Metadata = {
  title: 'Car app',
  description: 'Statistic app for car',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
