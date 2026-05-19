import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui'

import { getMainNavButtons } from '../lib'
import { MainNav } from './main-nav'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const tGlobal = useTranslations()
  const navItems = getMainNavButtons(tGlobal)

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#">
                <span className="text-base font-semibold font-heading">
                  Fleet
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MainNav items={navItems} />
      </SidebarContent>
    </Sidebar>
  )
}
