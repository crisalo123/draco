import type { Product, ProductCategory } from '@/domain/product.types'
import { productsByCategory } from '@/data/catalog'
import { useTranslation } from 'react-i18next'
import { ProductCard } from '@/presentation/components/ProductCard'

const SECTION_IDS: Record<ProductCategory, string> = {
  extract: 'catalog-extract',
}

interface ProductSectionProps {
  category: ProductCategory
}

export function ProductSection({ category }: ProductSectionProps) {
  const { t } = useTranslation()
  const items: readonly Product[] = productsByCategory(category)
  const sectionKey = `sections.${category}` as const
  const id = SECTION_IDS[category]

  return (
    <section
      id={id}
      className="scroll-mt-28 border-b border-emerald-100/8 py-16 last:border-0 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display mb-10 text-2xl text-denuded-parchment sm:text-3xl">
          {t(sectionKey)}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
