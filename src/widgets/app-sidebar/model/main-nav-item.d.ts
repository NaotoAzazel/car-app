import { Icons } from '@/shared/ui'

export interface MainNavItem {
  title: string
  url: string
  icon: keyof typeof Icons
}
