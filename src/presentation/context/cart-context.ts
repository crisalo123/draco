import type { CartLine } from '@/application/cart/cart.types'
import { createContext } from 'react'

export interface CartContextValue {
  lines: readonly CartLine[]
  totalItems: number
  addProduct: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  removeLine: (productId: string) => void
  clear: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
