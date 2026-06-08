import { formatCop } from '@/application/pricing/formatCop'
import { getProductPriceRow } from '@/data/pricing'
import type { TFunction } from 'i18next'

export function productPriceParts(
  productId: string,
  locale: string,
  t: TFunction,
): { label: string; approximate: boolean } {
  const row = getProductPriceRow(productId)
  if (!row) return { label: '', approximate: false }
  const money = formatCop(row.pesos, locale)
  let label = money
  if (row.mode === 'per_bottle') {
    label = `${money} ${t('price.per_bottle')}`
  }
  if (row.mode === 'from') {
    label = `${t('price.from')} ${money}`
  }
  return { label, approximate: Boolean(row.approximate) }
}
