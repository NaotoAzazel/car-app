export function formatCurrency(number: number) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'UAH',
  }).format(number)
}
