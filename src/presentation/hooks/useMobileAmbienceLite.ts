import { useEffect, useState } from 'react'

/** Viewport tipo móvil: menos piezas decorativas en ScrollAmbience */
export function useMobileAmbienceLite(maxWidthPx = 639): boolean {
  const [lite, setLite] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidthPx}px)`)
    const apply = () => setLite(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [maxWidthPx])

  return lite
}
