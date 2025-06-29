import type { Metadata } from 'next'

import '@/shared/globals.css'

import { cn, fontHeading, fontText } from '@/shared/lib'

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
    <html lang="en">
      <body
        className={cn(
          'relative h-full font-primary antialiased',
          fontHeading.variable,
          fontText.variable,
        )}
      >
        <main className="relative flex min-h-screen flex-col">
          <div className="flex-1 flex-grow">{children}</div>
        </main>
      </body>
    </html>
  )
}
