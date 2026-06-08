import { CartContext } from '@/presentation/context/cart-context'
import { useContext } from 'react'

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return ctx
}
