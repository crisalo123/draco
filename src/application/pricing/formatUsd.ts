/** Formato USD desde centavos (como Shopify: 1900 → $19.00). */
export function formatUsd(cents: number, locale: string): string {
  const tag = locale.toLowerCase().startsWith('es') ? 'es-US' : 'en-US'
  return new Intl.NumberFormat(tag, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100)
}
