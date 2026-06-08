import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { CartDrawer } from '@/presentation/components/CartDrawer'
import { Footer } from '@/presentation/components/Footer'
import { Header } from '@/presentation/components/Header'
import { ScrollAmbience } from '@/presentation/components/ScrollAmbience'
import { useWhatsAppOrder } from '@/presentation/hooks/useWhatsAppOrder'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export function AboutPage() {
  const { t } = useTranslation()
  const [cartOpen, setCartOpen] = useState(false)
  const { openOrder } = useWhatsAppOrder()

  const handleWhatsApp = useCallback(() => {
    openOrder()
  }, [openOrder])

  return (
    <div className="relative min-h-screen bg-[#0f1f16]">
      <ScrollAmbience />

      <div className="relative z-10">
        <Header onOpenCart={() => setCartOpen(true)} />

        <main>
          <section className="relative overflow-hidden border-b border-white/10">
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              aria-hidden
            >
              <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
              <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-lime-300/8 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-denuded-gold sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
                {t('about.hero_eyebrow')}
              </p>
              <h1 className="font-display max-w-3xl text-3xl tracking-tight text-denuded-parchment sm:text-5xl md:text-6xl">
                {t('about.title')}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-400 sm:text-xl">
                {t('about.hero_lead')}
              </p>
            </div>
          </section>

          <section className="border-b border-white/5 py-14 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className="font-display text-2xl text-denuded-parchment sm:text-3xl">
                {t('about.who_title')}
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-stone-400 sm:text-lg">
                {t('about.who_body')}
              </p>
            </div>
          </section>

          <section className="border-b border-white/5 py-14 sm:py-16">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:gap-12 sm:px-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
                <h2 className="font-display text-xl text-denuded-gold sm:text-2xl">
                  {t('about.mission_title')}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-stone-400 sm:text-base">
                  {t('about.mission_body')}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
                <h2 className="font-display text-xl text-denuded-gold sm:text-2xl">
                  {t('about.vision_title')}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-stone-400 sm:text-base">
                  {t('about.vision_body')}
                </p>
              </div>
            </div>
          </section>

          <section className="border-b border-white/5 py-14 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className="font-display text-2xl text-denuded-parchment sm:text-3xl">
                {t('about.quality_title')}
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-stone-400 sm:text-lg">
                {t('about.quality_intro')}
              </p>
            </div>
          </section>

          <section className="py-14 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className="font-display text-2xl text-denuded-parchment sm:text-3xl">
                {t('about.pillars_title')}
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {(['pillar1', 'pillar2', 'pillar3'] as const).map((key) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 shadow-inner shadow-black/20"
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-denuded-gold">
                      {t(`about.${key}_title`)}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-400">
                      {t(`about.${key}_body`)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                <Link
                  to="/"
                  state={{ scrollTo: 'catalog' }}
                  className="rounded-full bg-denuded-parchment px-7 py-3.5 text-sm font-semibold text-emerald-950 shadow-xl shadow-emerald-950/30 transition hover:bg-white"
                >
                  {t('about.cta_catalog')}
                </Link>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-denuded-parchment backdrop-blur transition hover:border-denuded-gold/50 hover:bg-white/10"
                >
                  {t('about.cta_whatsapp')}
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />

        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </div>
  )
}
