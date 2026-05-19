import { Icons } from '@/shared/ui'

export enum CardStatus {
  NO_DATA,
  ALL_GOOD,
  AVG_CONDITION,
  VERY_BAD,
}

export const statusVisualConfig = {
  [CardStatus.NO_DATA]: {
    icon: Icons.helpCircle,
    color: 'text-gray-400',
  },
  [CardStatus.ALL_GOOD]: {
    icon: Icons.checkCircle,
    color: 'text-green-500',
  },
  [CardStatus.AVG_CONDITION]: {
    icon: Icons.alertTriangle,
    color: 'text-yellow-500',
  },
  [CardStatus.VERY_BAD]: {
    icon: Icons.alertCircle,
    color: 'text-red-500',
  },
} as const

export const getStatusConfig = (t: (key: string) => string) => {
  return {
    [CardStatus.NO_DATA]: {
      ...statusVisualConfig[CardStatus.NO_DATA],
      label: t('CardStatus.NO_DATA'),
    },
    [CardStatus.ALL_GOOD]: {
      ...statusVisualConfig[CardStatus.ALL_GOOD],
      label: t('CardStatus.ALL_GOOD'),
    },
    [CardStatus.AVG_CONDITION]: {
      ...statusVisualConfig[CardStatus.AVG_CONDITION],
      label: t('CardStatus.AVG_CONDITION'),
    },
    [CardStatus.VERY_BAD]: {
      ...statusVisualConfig[CardStatus.VERY_BAD],
      label: t('CardStatus.VERY_BAD'),
    },
  } as const
}
