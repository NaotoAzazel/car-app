import { SidebarProvider } from '@/shared/ui'

import { ServiceWorkerRegister } from './service-worker-register'
import { TanstackProvider } from './tanstack-provider'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <TanstackProvider>
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        {children}
        <ServiceWorkerRegister />
      </SidebarProvider>
    </TanstackProvider>
  )
}
