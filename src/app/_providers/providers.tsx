import { SidebarProvider } from '@/shared/ui'

import { TanstackProvider } from './tanstack-provider'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <TanstackProvider>{children}</TanstackProvider>
    </SidebarProvider>
  )
}
