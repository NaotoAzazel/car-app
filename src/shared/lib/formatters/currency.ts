export function formatCurrency(number: number) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number)
}
