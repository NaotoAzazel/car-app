'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { CreateRecordDialog } from '@/entities/record'
import { cn } from '@/shared/lib'
import {
  Icons,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui'

import { MainNavItem } from '../model'

interface MainNavProps {
  items: MainNavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <CreateRecordDialog />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = Icons[item.icon]

            return (
              <SidebarMenuItem key={item.title}>
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
    </SidebarGroup>
  )
}
