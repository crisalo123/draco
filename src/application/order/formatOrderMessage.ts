import type { CartLine } from '@/application/cart/cart.types'

export function formatOrderMessage(
  intro: string,
  lines: readonly CartLine[],
  labelById: (productId: string) => string,
  outro: string,
): string {
  if (lines.length === 0) {
    return `${intro}\n\n${outro}`.trim()
  }
  const body = lines
    .map((l) => {
      const name = labelById(l.productId)
      return `• ${name} × ${l.quantity}`
    })
    .join('\n')
  return `${intro}\n\n${body}\n\n${outro}`.trim()
}
