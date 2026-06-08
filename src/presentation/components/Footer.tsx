import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const instagramUrl = (
    import.meta.env.VITE_INSTAGRAM_URL as string | undefined
  )?.trim()

  return (
    <footer className="border-t border-emerald-100/10 bg-emerald-950/30">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-display text-xl text-denuded-parchment">
              {t('brand')}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-500">
              {t('footer.rights', { year })}
            </p>
            <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link
                to="/"
                className="font-medium text-denuded-gold/90 hover:text-denuded-parchment"
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/about"
                className="font-medium text-denuded-gold/90 hover:text-denuded-parchment"
              >
                {t('nav.about')}
              </Link>
            </nav>
            {instagramUrl ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-denuded-gold hover:text-denuded-parchment"
              >
                {t('footer.instagram')}
                <span aria-hidden>↗</span>
              </a>
            ) : null}
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-400">
              {t('footer.locations_title')}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-stone-500">
              {t('locations.body')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
