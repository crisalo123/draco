import type { Product } from '@/domain/product.types'
import {
  getProductImageUrl,
} from '@/data/product-media'
import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCart } from '@/presentation/hooks/useCart'
import { useProductPriceLabel } from '@/presentation/hooks/useProductPriceLabel'
import { ImageZoomLightbox } from '@/presentation/components/ImageZoomLightbox'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation()
  const { addProduct, lines } = useCart()
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [imageZoomOpen, setImageZoomOpen] = useState(false)
  const panelId = useId()

  const line = lines.find((l) => l.productId === product.id)
  const qty = line?.quantity ?? 0

  const nameKey = `products.${product.id}.name` as const
  const summaryKey = `products.${product.id}.summary` as const
  const imgSrc = getProductImageUrl(product.id)
  const title = t(nameKey)
  const summary = t(summaryKey)
  const hasSummary = summary !== summaryKey
  const { label: priceLabel, approximate } = useProductPriceLabel(product.id)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-emerald-100/10 bg-gradient-to-b from-emerald-50/[0.06] to-transparent shadow-lg shadow-emerald-950/20 transition hover:border-denuded-gold/40 hover:shadow-denuded-gold/15">
      <div
        className={`relative aspect-[5/4] overflow-hidden bg-[#dcefe3] ring-0 transition-[box-shadow,ring] duration-300 group-hover:shadow-[inset_0_0_0_1px_rgba(143,212,168,0.35)] flex items-center justify-center p-3 sm:p-4`}
      >
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full object-contain object-center transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1f16]/40 via-transparent to-transparent opacity-60" />
        {product.featured ? (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-denuded-gold/40 bg-denuded-gold/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-denuded-gold backdrop-blur-sm">
            {t('product.featured')}
          </span>
        ) : null}
        <span
          className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/35 text-denuded-gold/90 opacity-0 shadow-lg backdrop-blur-sm transition duration-300 group-hover:opacity-100"
          aria-hidden
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
            <circle cx="10" cy="10" r="6.5" />
            <path d="M15 15l5 5" strokeLinecap="round" />
          </svg>
        </span>
        <button
          type="button"
          onClick={() => setImageZoomOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={imageZoomOpen}
          aria-label={t('product.zoom_open_named', { name: title })}
          className="absolute inset-0 z-[1] cursor-zoom-in rounded-none border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-denuded-gold/70"
        />
      </div>

      <ImageZoomLightbox
        open={imageZoomOpen}
        onClose={() => setImageZoomOpen(false)}
        src={imgSrc}
        alt=""
        dialogLabel={t('product.zoom_dialog_named', { name: title })}
        closeLabel={t('product.zoom_close')}
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 h-px w-12 bg-gradient-to-r from-denuded-gold to-transparent opacity-80" />

        <h3 className="font-display min-h-[3.25rem] text-lg leading-snug text-denuded-parchment sm:text-xl">
          {title}
        </h3>

        {priceLabel ? (
          <p className="mt-2 flex flex-wrap items-baseline gap-1.5 text-sm font-semibold tabular-nums text-denuded-gold">
            <span>{priceLabel}</span>
            {approximate ? (
              <span
                className="cursor-help text-xs font-normal text-stone-500"
                title={t('price.approx_hint')}
              >
                *
              </span>
            ) : null}
          </p>
        ) : null}

        {hasSummary ? (
          <div className="mt-4">
            <button
              type="button"
              id={`${panelId}-trigger`}
              aria-expanded={detailsOpen}
              aria-controls={panelId}
              onClick={() => setDetailsOpen((o) => !o)}
              className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-denuded-gold/35 bg-gradient-to-r from-white/[0.06] via-emerald-950/15 to-white/[0.04] px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-denuded-parchment shadow-inner shadow-white/5 ring-1 ring-white/5 transition hover:border-denuded-gold/55 hover:from-denuded-gold/10 hover:via-emerald-950/25 hover:to-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-denuded-gold/70"
            >
              <span
                className="absolute inset-0 opacity-0 transition group-hover/btn:opacity-100"
                aria-hidden
              >
                <span className="absolute -left-1/4 top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-denuded-gold/15 to-transparent animate-product-shimmer" />
              </span>
              <svg
                className="relative h-3.5 w-3.5 shrink-0 text-denuded-gold"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 3.5c-1.2 2.1-4.5 6.8-4.5 10.2a4.5 4.5 0 109 0c0-3.4-3.3-8.1-4.5-10.2z" />
              </svg>
              <span className="relative">
                {detailsOpen ? t('product.details_hide') : t('product.details_open')}
              </span>
              <svg
                className={`relative h-4 w-4 shrink-0 text-denuded-gold/90 transition-transform duration-300 ease-out ${
                  detailsOpen ? 'rotate-180' : ''
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
              style={{ gridTemplateRows: detailsOpen ? '1fr' : '0fr' }}
            >
              <div id={panelId} className="min-h-0 overflow-hidden" role="region" aria-labelledby={`${panelId}-trigger`}>
                <div className="mt-2 rounded-xl border border-white/10 bg-gradient-to-b from-stone-900/90 to-black/40 p-3.5 shadow-inner shadow-black/40 backdrop-blur-sm">
                  <p className="text-sm leading-relaxed text-stone-300">{summary}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          {qty > 0 ? (
            <span className="text-sm font-medium text-denuded-gold">× {qty}</span>
          ) : (
            <span className="text-sm text-stone-600" aria-hidden>
              {' '}
            </span>
          )}
          <button
            type="button"
            onClick={() => addProduct(product.id)}
            className="rounded-full bg-denuded-gold px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-200 group-hover:shadow-lg group-hover:shadow-denuded-gold/30"
          >
            {t('product.add')}
          </button>
        </div>
      </div>
    </article>
  )
}
