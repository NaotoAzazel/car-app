export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {},
) {
  return new Intl.DateTimeFormat('ru-RU', {
    year: options.year ?? 'numeric',
    month: options.month ?? 'numeric',
    day: options.day ?? 'numeric',
    timeZone: 'Europe/Kyiv',
    ...options,
  }).format(new Date(date))
}
