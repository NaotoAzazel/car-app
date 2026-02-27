'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { MileageHistoryDialog } from '@/entities/mileage'
import { CreateRecordDialog } from '@/entities/record'
import { NotificationStatusContainer } from '@/entities/subscription'
import { cn } from '@/shared/lib'
import {
  Icons,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/ui'

import { MainNavItem } from '../model'
import { LogoutButton } from './logout-button'

interface MainNavProps {
  items: MainNavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarGroup className="h-full flex">
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col gap-1">
            <div className="flex flex-row gap-1">
              <div className="flex-1">
                <CreateRecordDialog />
              </div>
            </div>
            <MileageHistoryDialog />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = Icons[item.icon]

            return (
              <SidebarMenuItem
                key={item.title}
                onClick={() => setOpenMobile(false)}
              >
                <SidebarMenuButton
                  tooltip={item.title}
                  className={cn(
                    pathname === item.url ? 'bg-accent' : 'transparent',
                  )}
                  asChild
                >
                  <Link href={item.url}>
                    <Icon className="mr-1 size-4" />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
      <div className="mt-auto flex flex-col gap-2">
        <NotificationStatusContainer />
        <LogoutButton />
      </div>
    </SidebarGroup>
  )
}
