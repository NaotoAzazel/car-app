import { DateRange } from 'react-day-picker'

export function isSameRange(a?: DateRange, b?: DateRange) {
  if (!a?.from || !a?.to || !b?.from || !b?.to) return false

  return (
    a.from.getTime() === b.from.getTime() && a.to.getTime() === b.to.getTime()
  )
}
