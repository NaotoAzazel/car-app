import { CreateMileageDialog } from '@/entities/mileage'
import { SidebarTrigger } from '@/shared/ui'

export function AppHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger variant="secondary" className="-ml-1" />
        <CreateMileageDialog />
      </div>
    </header>
  )
}
