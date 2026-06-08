import { productPriceParts } from '@/presentation/formatting/productPriceLabel'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

export function useProductPriceLabel(productId: string): {
  label: string
  approximate: boolean
} {
  const { i18n, t } = useTranslation()

  return useMemo(
    () => productPriceParts(productId, i18n.language, t),
    [productId, i18n.language, t],
  )
}
