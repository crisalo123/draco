/**
 * Medios extraídos del PDF de referencia (logo DRACO + tarros blancos por producto).
 */
import { CATALOG } from '@/data/catalog'
import logo from '@/assets/logo.jpg'
import hero from '@/assets/hero.jpg'
import imgReishi from '@/assets/img_reishi.jpg'
import imgLionMane from '@/assets/img_lion_mane.jpg'
import imgMaitake from '@/assets/img_maitake.jpg'
import imgTurkeyTail from '@/assets/img_turkey_tail.jpg'
import imgCordyceps from '@/assets/img_cordyceps.jpg'
import imgShiitake from '@/assets/img_shiitake.jpg'

const W = 900

export const BRAND_LOGO_URL: string = logo

export const HERO_POSTER_URL: string = hero

const PRODUCT_IMAGE_LOCAL: Record<string, string> = {
  extract_reishi: imgReishi,
  extract_lion_mane: imgLionMane,
  extract_maitake: imgMaitake,
  extract_turkey_tail: imgTurkeyTail,
  extract_cordyceps: imgCordyceps,
  extract_shiitake: imgShiitake,
}

const DEFAULT_PRODUCT_FALLBACK = imgReishi

for (const p of CATALOG) {
  if (PRODUCT_IMAGE_LOCAL[p.id] === undefined) {
    throw new Error(
      `[product-media] Falta imagen para el producto "${p.id}". Añade una entrada en PRODUCT_IMAGE_LOCAL.`,
    )
  }
}

export function getProductImageUrl(productId: string, _width = W): string {
  return PRODUCT_IMAGE_LOCAL[productId] ?? DEFAULT_PRODUCT_FALLBACK
}

export function isUserAdjustedProductImage(src: string): boolean {
  return /img_/i.test(src)
}
