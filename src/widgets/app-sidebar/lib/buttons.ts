import { redirects } from '@/shared/constants'

import { MainNavItem } from '../model'

export const MAIN_NAV_BUTTONS: MainNavItem[] = [
  { title: 'Обслуживание', url: '/', icon: 'wrench' },
  { title: 'Отчеты', url: redirects.toReportPage, icon: 'chart' },
  { title: 'История', url: redirects.toRecordsPage, icon: 'history' },
  { title: 'Компоненты', url: redirects.toComponentsPage, icon: 'component' },
]
