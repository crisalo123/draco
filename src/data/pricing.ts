/**
 * Precios orientativos en COP — confirmar al pedir por WhatsApp.
 */
export type PriceMode = 'unit' | 'per_bottle' | 'from'

export interface ProductPriceRow {
  readonly pesos: number
  readonly mode: PriceMode
  readonly approximate?: boolean
}

export const PRODUCT_PRICES: Readonly<Record<string, ProductPriceRow>> = {
  extract_reishi: { pesos: 65000, mode: 'unit', approximate: true },
  extract_lion_mane: { pesos: 72000, mode: 'unit', approximate: true },
  extract_maitake: { pesos: 62000, mode: 'unit', approximate: true },
  extract_turkey_tail: { pesos: 59000, mode: 'unit', approximate: true },
  extract_cordyceps: { pesos: 78000, mode: 'unit', approximate: true },
  extract_shiitake: { pesos: 58000, mode: 'unit', approximate: true },
}

export function getProductPriceRow(productId: string): ProductPriceRow | undefined {
  return PRODUCT_PRICES[productId]
}
