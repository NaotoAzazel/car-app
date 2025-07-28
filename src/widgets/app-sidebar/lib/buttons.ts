import { redirects } from '@/shared/constants'

import { MainNavItem } from '../model'

export const MAIN_NAV_BUTTONS: MainNavItem[] = [
  { title: 'Отчеты', url: '/', icon: 'chart' },
  { title: 'История', url: redirects.toRecordsPage, icon: 'history' },
  { title: 'Компоненты', url: redirects.toComponentsPage, icon: 'component' },
  { title: 'Тип записи', url: '/record-type', icon: 'list' },
]
