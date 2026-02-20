import { AppHeader } from '@/widgets/app-header'
import { AppSidebar } from '@/widgets/app-sidebar'
import { SidebarInset } from '@/shared/ui'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <AppHeader />
        <main className="relative flex flex-col">
          <div className="flex-1 flex-grow m-6">{children}</div>
        </main>
      </SidebarInset>
    </>
  )
}
