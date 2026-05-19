import { redirects } from '@/shared/constants'

import { MainNavItem } from '../model'

export const getMainNavButtons = (
  t: (key: string) => string,
): MainNavItem[] => [
  {
    title: t('appSidebar.navigation.maintenance'),
    url: '/',
    icon: 'wrench',
  },
  {
    title: t('appSidebar.navigation.reports'),
    url: redirects.toReportPage,
    icon: 'chart',
  },
  {
    title: t('appSidebar.navigation.history'),
    url: redirects.toRecordsPage,
    icon: 'history',
  },
  {
    title: t('appSidebar.navigation.components'),
    url: redirects.toComponentsPage,
    icon: 'component',
  },
]
