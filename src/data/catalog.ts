import type { Product } from '@/domain/product.types'

/** Catálogo estático alineado al PDF DRACO — 6 hongos medicinales */
export const CATALOG: readonly Product[] = [
  {
    id: 'extract_reishi',
    category: 'extract',
    featured: true,
  },
  {
    id: 'extract_lion_mane',
    category: 'extract',
    featured: true,
  },
  {
    id: 'extract_maitake',
    category: 'extract',
    featured: true,
  },
  {
    id: 'extract_turkey_tail',
    category: 'extract',
  },
  {
    id: 'extract_cordyceps',
    category: 'extract',
    featured: true,
  },
  {
    id: 'extract_shiitake',
    category: 'extract',
  },
] as const

export function getProductById(id: string): Product | undefined {
  return CATALOG.find((p) => p.id === id)
}

export function productsByCategory(
  category: Product['category'],
): readonly Product[] {
  return CATALOG.filter((p) => p.category === category)
}
