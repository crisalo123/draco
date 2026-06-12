import { BRAND_LOGO_URL } from '@/data/product-media'
import { setLocale, type AppLocale } from '@/infrastructure/i18n/i18n.config'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '@/presentation/hooks/useCart'

interface HeaderProps {
  onOpenCart: () => void
}

export function Header({ onOpenCart }: HeaderProps) {
  const { t, i18n } = useTranslation()
  const { totalItems } = useCart()

  const locale = (i18n.language.startsWith('es') ? 'es' : 'en') as AppLocale

  const aboutIcon = (
    <svg
      className="h-3.5 w-3.5 shrink-0 opacity-80 sm:h-4 sm:w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100/10 bg-[#0f1f16]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 sm:py-4">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-3 sm:gap-4"
          aria-label={t('nav.home')}
        >
          <img
            src={BRAND_LOGO_URL}
            alt={t('brand')}
            decoding="async"
            draggable={false}
            className="h-11 w-auto max-w-[10.75rem] shrink-0 object-contain object-left sm:h-12 sm:max-w-[12.5rem] md:h-[3.4rem] md:max-w-[13.5rem]"
          />
          <div className="hidden min-w-0 flex-col border-l border-white/10 pl-3 sm:flex sm:pl-4">
            <span className="font-display text-lg tracking-tight text-denuded-parchment transition group-hover:text-denuded-gold sm:text-xl">
              {t('brand')}
            </span>
            <span className="max-w-[11rem] truncate text-[11px] text-stone-500 sm:max-w-[18rem] sm:text-xs">
              {t('tagline')}
            </span>
          </div>
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
          <nav
            aria-label={t('nav.main_label')}
            className="hidden shrink-0 sm:block"
          >
            <div className="flex rounded-full border border-white/15 bg-white/5 p-0.5 shadow-inner shadow-black/20">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition sm:px-4 sm:text-sm ${
                    isActive
                      ? 'bg-white/15 font-display text-denuded-parchment ring-1 ring-denuded-gold/35'
                      : 'font-display text-stone-400 hover:bg-white/[0.07] hover:text-denuded-parchment'
                  }`
                }
              >
                {aboutIcon}
                {t('nav.about')}
              </NavLink>
            </div>
          </nav>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `sm:hidden shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium shadow-inner shadow-black/20 transition ${
                isActive
                  ? 'bg-white/15 font-display text-denuded-parchment ring-1 ring-denuded-gold/35'
                  : 'font-display text-stone-400 hover:bg-white/[0.07] hover:text-denuded-parchment'
              }`
            }
            aria-label={t('nav.about')}
          >
            <span className="inline-flex items-center gap-1.5">
              {aboutIcon}
              <span className="max-w-22 truncate">{t('nav.about')}</span>
            </span>
          </NavLink>

          <div className="flex rounded-full border border-white/15 bg-white/5 p-0.5">
            <button
              type="button"
              onClick={() => setLocale('en')}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition sm:px-3 sm:text-sm ${
                locale === 'en'
                  ? 'bg-white/15 text-denuded-parchment'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale('es')}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition sm:px-3 sm:text-sm ${
                locale === 'es'
                  ? 'bg-white/15 text-denuded-parchment'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              ES
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 rounded-full border border-denuded-gold/45 bg-gradient-to-r from-denuded-gold/20 to-emerald-900/25 px-3 py-2 text-sm font-medium text-denuded-parchment shadow-lg shadow-emerald-950/30 transition hover:border-denuded-gold/70 hover:from-denuded-gold/30 sm:px-4"
            aria-label={t('nav.cart')}
          >
            <svg
              className="h-5 w-5 shrink-0 opacity-90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden
            >
              <path d="M6 6h15l-1.5 9h-12z" strokeLinejoin="round" />
              <path d="M6 6 5 3H2" strokeLinecap="round" />
              <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
              <circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none" />
            </svg>
            <span className="hidden sm:inline">{t('nav.cart')}</span>
            {totalItems > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-denuded-gold px-1 text-[10px] font-bold text-emerald-950">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  )
}
