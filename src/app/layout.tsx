import type { Metadata } from 'next'

import '@/shared/globals.css'

import { AppHeader } from '@/widgets/app-header'
import { AppSidebar } from '@/widgets/app-sidebar'
import { cn, fontHeading, fontText } from '@/shared/lib'
import { SidebarInset, SidebarProvider } from '@/shared/ui'

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
        className={cn(
          'relative h-full font-primary antialiased',
          fontHeading.variable,
          fontText.variable,
        )}
      >
        <SidebarProvider
          style={
            {
              '--sidebar-width': 'calc(var(--spacing) * 72)',
              '--header-height': 'calc(var(--spacing) * 12)',
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <AppHeader />
            <main className="relative flex min-h-screen flex-col">
              <div className="flex-1 flex-grow m-6">{children}</div>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
