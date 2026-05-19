export enum DIAPASONE_BUTTONS_VALUES {
  'TODAY',
  'TODAY_AND_YESTERDAY',
  'YESTERDAY',
  'THIS_WEEK',
  'LAST_WEEK',
  'THIS_MONTH',
  'LAST_MONTH',
}

export const getDiapasoneButtons = (t: (key: string) => string) => [
  {
    title: t('mileage.history-dialog.date-picker.ranges.TODAY'),
    value: DIAPASONE_BUTTONS_VALUES.TODAY,
  },
  {
    title: t('mileage.history-dialog.date-picker.ranges.TODAY_AND_YESTERDAY'),
    value: DIAPASONE_BUTTONS_VALUES.TODAY_AND_YESTERDAY,
  },
  {
    title: t('mileage.history-dialog.date-picker.ranges.YESTERDAY'),
    value: DIAPASONE_BUTTONS_VALUES.YESTERDAY,
  },
  {
    title: t('mileage.history-dialog.date-picker.ranges.THIS_WEEK'),
    value: DIAPASONE_BUTTONS_VALUES.THIS_WEEK,
  },
  {
    title: t('mileage.history-dialog.date-picker.ranges.LAST_WEEK'),
    value: DIAPASONE_BUTTONS_VALUES.LAST_WEEK,
  },
  {
    title: t('mileage.history-dialog.date-picker.ranges.THIS_MONTH'),
    value: DIAPASONE_BUTTONS_VALUES.THIS_MONTH,
  },
  {
    title: t('mileage.history-dialog.date-picker.ranges.LAST_MONTH'),
    value: DIAPASONE_BUTTONS_VALUES.LAST_MONTH,
  },
]
