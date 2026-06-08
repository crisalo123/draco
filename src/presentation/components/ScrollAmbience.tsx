import { useMemo } from 'react'
import { useMobileAmbienceLite } from '@/presentation/hooks/useMobileAmbienceLite'
import { usePrefersReducedMotion } from '@/presentation/hooks/usePrefersReducedMotion'
import { useScrollParallax } from '@/presentation/hooks/useScrollParallax'

interface DecoItem {
  readonly kind: 'mushroom' | 'leaf'
  readonly left: string
  readonly top: string
  readonly size: number
  readonly parallax: number
  readonly rotate: number
  readonly opacity: number
  readonly delay: string
  readonly duration: string
}

const DECO: readonly DecoItem[] = [
  {
    kind: 'leaf',
    left: '3%',
    top: '6%',
    size: 72,
    parallax: 0.14,
    rotate: -18,
    opacity: 0.34,
    delay: '0s',
    duration: '14s',
  },
  {
    kind: 'mushroom',
    left: '86%',
    top: '10%',
    size: 56,
    parallax: 0.1,
    rotate: 22,
    opacity: 0.38,
    delay: '-3s',
    duration: '12s',
  },
  {
    kind: 'mushroom',
    left: '10%',
    top: '38%',
    size: 64,
    parallax: 0.18,
    rotate: -8,
    opacity: 0.32,
    delay: '-1.5s',
    duration: '13s',
  },
  {
    kind: 'leaf',
    left: '74%',
    top: '44%',
    size: 68,
    parallax: 0.15,
    rotate: 14,
    opacity: 0.28,
    delay: '-6s',
    duration: '16s',
  },
  {
    kind: 'mushroom',
    left: '5%',
    top: '68%',
    size: 52,
    parallax: 0.11,
    rotate: 35,
    opacity: 0.36,
    delay: '-5s',
    duration: '11s',
  },
  {
    kind: 'leaf',
    left: '90%',
    top: '62%',
    size: 60,
    parallax: 0.16,
    rotate: -25,
    opacity: 0.26,
    delay: '-9s',
    duration: '15s',
  },
  {
    kind: 'mushroom',
    left: '46%',
    top: '18%',
    size: 44,
    parallax: 0.08,
    rotate: -30,
    opacity: 0.3,
    delay: '-0.5s',
    duration: '10s',
  },
  {
    kind: 'leaf',
    left: '50%',
    top: '82%',
    size: 78,
    parallax: 0.13,
    rotate: 8,
    opacity: 0.31,
    delay: '-11s',
    duration: '17s',
  },
  {
    kind: 'mushroom',
    left: '28%',
    top: '12%',
    size: 48,
    parallax: 0.12,
    rotate: 12,
    opacity: 0.32,
    delay: '-7s',
    duration: '12.5s',
  },
  {
    kind: 'leaf',
    left: '62%',
    top: '28%',
    size: 54,
    parallax: 0.11,
    rotate: -12,
    opacity: 0.29,
    delay: '-4s',
    duration: '14s',
  },
  {
    kind: 'mushroom',
    left: '34%',
    top: '56%',
    size: 58,
    parallax: 0.17,
    rotate: -22,
    opacity: 0.33,
    delay: '-2s',
    duration: '13s',
  },
  {
    kind: 'leaf',
    left: '18%',
    top: '88%',
    size: 66,
    parallax: 0.14,
    rotate: 20,
    opacity: 0.3,
    delay: '-8s',
    duration: '15s',
  },
  {
    kind: 'mushroom',
    left: '72%',
    top: '78%',
    size: 50,
    parallax: 0.12,
    rotate: 40,
    opacity: 0.35,
    delay: '-10s',
    duration: '11s',
  },
  {
    kind: 'leaf',
    left: '94%',
    top: '36%',
    size: 46,
    parallax: 0.13,
    rotate: -35,
    opacity: 0.32,
    delay: '-5.5s',
    duration: '14s',
  },
]

const MOBILE_DECO_SKIP = new Set<number>([4, 7, 10, 12])

function decoForViewport(mobileLite: boolean): readonly DecoItem[] {
  if (!mobileLite) return DECO
  return DECO.filter((_, i) => !MOBILE_DECO_SKIP.has(i))
}

function clampParallaxY(
  scrollY: number,
  parallax: number,
  mobileLite: boolean,
): number {
  const raw = scrollY * parallax
  const capPx = mobileLite ? 72 : 120
  return Math.max(-capPx, Math.min(raw, capPx))
}

function MushroomGlyph({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="text-emerald-100/90 drop-shadow-[0_0_12px_rgba(143,212,168,0.35)]"
    >
      <path
        d="M24 8c-8 0-14 5.5-14 13 0 3.5 1.2 6.5 3 8.5V38c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V29.5c1.8-2 3-5 3-8.5 0-7.5-6-13-14-13Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path
        d="M14 22c3-2 6.5-3 10-3s7 1 10 3"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity={0.55}
      />
      <ellipse cx="20" cy="18" rx="2.2" ry="1.4" fill="currentColor" opacity={0.35} />
      <ellipse cx="28" cy="16" rx="2.5" ry="1.5" fill="currentColor" opacity={0.3} />
      <ellipse cx="24" cy="21" rx="1.8" ry="1.2" fill="currentColor" opacity={0.28} />
    </svg>
  )
}

function LeafGlyph({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="text-emerald-300/85 drop-shadow-[0_0_10px_rgba(52,211,153,0.28)]"
    >
      <path
        d="M38 10C26 10 14 18 10 30c12-2 22-10 28-20m0 0c-4 10-12 18-22 22"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 26c8 2 16-2 22-10"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity={0.55}
      />
    </svg>
  )
}

function DecoGlyph({ kind, size }: { kind: DecoItem['kind']; size: number }) {
  return kind === 'mushroom' ? (
    <MushroomGlyph size={size} />
  ) : (
    <LeafGlyph size={size} />
  )
}

export function ScrollAmbience() {
  const scrollY = useScrollParallax()
  const reducedMotion = usePrefersReducedMotion()
  const mobileLite = useMobileAmbienceLite()

  const decoVisible = useMemo(
    () => decoForViewport(mobileLite),
    [mobileLite],
  )

  if (reducedMotion) {
    const reducedList = decoVisible.slice(0, mobileLite ? 6 : 8)
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,rgba(143,212,168,0.14),transparent_65%),radial-gradient(ellipse_70%_45%_at_80%_90%,rgba(74,222,128,0.08),transparent)]" />
        {reducedList.map((item) => (
          <span
            key={`${item.left}-${item.top}-${item.kind}`}
            className="absolute"
            style={{
              left: item.left,
              top: item.top,
              opacity: Math.min(item.opacity + 0.06, 0.48),
              transform: `rotate(${item.rotate}deg)`,
            }}
          >
            <DecoGlyph kind={item.kind} size={item.size} />
          </span>
        ))}
      </div>
    )
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-5%,rgba(143,212,168,0.16),transparent_60%),radial-gradient(ellipse_75%_50%_at_100%_80%,rgba(52,211,153,0.1),transparent),radial-gradient(ellipse_60%_40%_at_0%_70%,rgba(134,239,172,0.08),transparent)]" />
      {decoVisible.map((item) => {
        const py = clampParallaxY(scrollY, item.parallax, mobileLite)
        return (
          <span
            key={`${item.left}-${item.top}-${item.kind}`}
            className="absolute will-change-transform"
            style={{
              left: item.left,
              top: item.top,
              opacity: item.opacity,
              transform: `translate3d(0, ${py}px, 0) rotate(${item.rotate}deg)`,
            }}
          >
            <span
              className="inline-block animate-ambience-drift"
              style={{
                animationDelay: item.delay,
                animationDuration: item.duration,
              }}
            >
              <DecoGlyph kind={item.kind} size={item.size} />
            </span>
          </span>
        )
      })}
    </div>
  )
}
