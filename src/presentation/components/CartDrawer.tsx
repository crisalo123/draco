import {
  getProductImageUrl,
  isUserAdjustedProductImage,
} from '@/data/product-media'
import { productPriceParts } from '@/presentation/formatting/productPriceLabel'
import { useTranslation } from 'react-i18next'
import { useCart } from '@/presentation/hooks/useCart'
import { useWhatsAppOrder } from '@/presentation/hooks/useWhatsAppOrder'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { t, i18n } = useTranslation()
  const { lines, setQuantity, removeLine, clear } = useCart()
  const { openOrder, hasPhone } = useWhatsAppOrder()

  if (!open) return null

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <aside
        className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-emerald-100/10 bg-[#0f1f16] shadow-2xl shadow-emerald-950/40"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-emerald-100/10 p-5">
          <div>
            <h2
              id="cart-title"
              className="font-display text-xl text-denuded-parchment"
            >
              {t('cart.title')}
            </h2>
            <p className="mt-1 text-sm text-stone-500">{t('cart.subtitle')}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 p-2 text-stone-400 transition hover:bg-white/10 hover:text-denuded-parchment"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {lines.length === 0 ? (
            <p className="text-center text-stone-500">{t('cart.empty')}</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => {
                const lineImg = getProductImageUrl(line.productId, 160)
                const lineImgNatural = isUserAdjustedProductImage(lineImg)
                const { label: linePrice, approximate: lineApprox } =
                  productPriceParts(line.productId, i18n.language, t)
                return (
                <li
                  key={line.productId}
                  className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <img
                      src={lineImg}
                      alt=""
                      className={`h-14 w-14 shrink-0 rounded-lg border border-white/10 bg-stone-900/90 p-0.5 ${
                        lineImgNatural ? 'object-contain' : 'object-cover'
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="font-medium leading-snug text-denuded-parchment">
                        {t(`products.${line.productId}.name`)}
                      </p>
                      {linePrice ? (
                        <p className="mt-1 text-xs tabular-nums text-denuded-gold/90">
                          {linePrice}
                          {lineApprox ? (
                            <span
                              className="ml-1 text-stone-500"
                              title={t('price.approx_hint')}
                            >
                              *
                            </span>
                          ) : null}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-stone-400">
                      <span>{t('cart.quantity')}</span>
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={line.quantity}
                        onChange={(e) => {
                          const n = Number.parseInt(e.target.value, 10)
                          if (Number.isFinite(n)) {
                            setQuantity(line.productId, n)
                          }
                        }}
                        className="w-14 rounded-lg border border-white/15 bg-black/40 px-2 py-1 text-center text-denuded-parchment"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => removeLine(line.productId)}
                      className="text-sm text-denuded-copper underline-offset-4 hover:underline"
                    >
                      {t('cart.remove')}
                    </button>
                  </div>
                </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-emerald-100/10 p-5">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => clear()}
              disabled={lines.length === 0}
              className="text-center text-sm text-stone-500 hover:text-stone-300 disabled:opacity-40"
            >
              {t('cart.clear')}
            </button>
            <button
              type="button"
              onClick={() => {
                openOrder()
                if (hasPhone && lines.length > 0) onClose()
              }}
              disabled={lines.length === 0}
              className="rounded-full bg-denuded-gold px-5 py-3.5 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-400 disabled:shadow-none"
            >
              {t('cart.send')}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
