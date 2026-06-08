import type { CartLine } from '@/application/cart/cart.types'

export function addLine(
  lines: readonly CartLine[],
  productId: string,
  amount = 1,
): CartLine[] {
  const next = lines.map((l) => ({ ...l }))
  const idx = next.findIndex((l) => l.productId === productId)
  if (idx === -1) {
    next.push({ productId, quantity: amount })
  } else {
    const line = next[idx]!
    line.quantity += amount
  }
  return next
}

export function setQuantity(
  lines: readonly CartLine[],
  productId: string,
  quantity: number,
): CartLine[] {
  if (quantity <= 0) {
    return lines.filter((l) => l.productId !== productId)
  }
  const next = lines.map((l) => ({ ...l }))
  const idx = next.findIndex((l) => l.productId === productId)
  if (idx === -1) {
    next.push({ productId, quantity })
  } else {
    next[idx]!.quantity = quantity
  }
  return next
}

export function removeLine(
  lines: readonly CartLine[],
  productId: string,
): CartLine[] {
  return lines.filter((l) => l.productId !== productId)
}

export function clearCart(): CartLine[] {
  return []
}
