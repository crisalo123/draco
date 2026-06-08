import { createPortal } from 'react-dom'
import { useEffect, useId, useRef } from 'react'

interface ImageZoomLightboxProps {
  open: boolean
  onClose: () => void
  src: string
  alt?: string
  /** Etiqueta accesible del diálogo (p. ej. nombre del producto). */
  dialogLabel: string
  closeLabel: string
}

export function ImageZoomLightbox({
  open,
  onClose,
  src,
  alt = '',
  dialogLabel,
  closeLabel,
}: ImageZoomLightboxProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    const t = window.setTimeout(() => closeRef.current?.focus(), 50)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      window.clearTimeout(t)
    }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="image-lightbox-root fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className="image-lightbox-backdrop absolute inset-0 z-0 cursor-zoom-out bg-[radial-gradient(ellipse_at_center,_rgba(10,8,7,0.92)_0%,_rgba(0,0,0,0.88)_55%,_rgba(0,0,0,0.94)_100%)] backdrop-blur-[10px] transition-opacity duration-300 ease-out motion-reduce:transition-none"
        aria-hidden
        onClick={onClose}
      />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-denuded-gold/[0.03] mix-blend-overlay" aria-hidden />

      <button
        ref={closeRef}
        type="button"
        className="pointer-events-auto absolute right-3 top-3 z-[202] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-stone-950/80 text-denuded-parchment shadow-lg shadow-black/40 backdrop-blur-md transition hover:border-denuded-gold/45 hover:bg-stone-900/95 hover:text-denuded-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-denuded-gold/70 motion-reduce:transition-none"
        aria-label={closeLabel}
        onClick={onClose}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className="image-lightbox-panel pointer-events-auto relative z-[201] flex max-h-[min(92vh,920px)] max-w-[min(96vw,1200px)] flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <p id={titleId} className="sr-only">
          {dialogLabel}
        </p>
        <div className="relative overflow-hidden rounded-2xl border border-emerald-100/12 bg-[#122820]/90 p-2 shadow-[0_32px_120px_-20px_rgba(0,0,0,0.75)] ring-1 ring-denuded-gold/15 sm:p-3">
          <img
            src={src}
            alt={alt}
            className="max-h-[min(86vh,880px)] w-auto max-w-full object-contain object-center"
            decoding="async"
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}
