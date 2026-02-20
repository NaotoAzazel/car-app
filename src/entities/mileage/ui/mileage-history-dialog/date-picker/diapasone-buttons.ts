export enum DIAPASONE_BUTTONS_VALUES {
  'TODAY',
  'TODAY_AND_YESTERDAY',
  'YESTERDAY',
  'THIS_WEEK',
  'LAST_WEEK',
  'THIS_MONTH',
  'LAST_MONTH',
}

export const DIAPASONE_BUTTONS = [
  {
    title: 'Сегодня',
    value: DIAPASONE_BUTTONS_VALUES.TODAY,
  },
  {
    title: 'Сегодня и вчера',
    value: DIAPASONE_BUTTONS_VALUES.TODAY_AND_YESTERDAY,
  },
  {
    title: 'Вчера',
    value: DIAPASONE_BUTTONS_VALUES.YESTERDAY,
  },
  {
    title: 'Эта неделя',
    value: DIAPASONE_BUTTONS_VALUES.THIS_WEEK,
  },
  {
    title: 'Прошлая неделя',
    value: DIAPASONE_BUTTONS_VALUES.LAST_WEEK,
  },
  {
    title: 'Этот месяц',
    value: DIAPASONE_BUTTONS_VALUES.THIS_MONTH,
  },
  {
    title: 'Прошлый месяц',
    value: DIAPASONE_BUTTONS_VALUES.LAST_MONTH,
  },
]
