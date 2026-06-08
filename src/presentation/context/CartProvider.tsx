import * as CartOps from '@/application/cart/cart.operations'
import type { CartLine } from '@/application/cart/cart.types'
import { CartContext } from '@/presentation/context/cart-context'
import {
  useCallback,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'

type CartAction =
  | { type: 'ADD'; productId: string }
  | { type: 'SET_QTY'; productId: string; quantity: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'CLEAR' }

function cartReducer(lines: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case 'ADD':
      return CartOps.addLine(lines, action.productId, 1)
    case 'SET_QTY':
      return CartOps.setQuantity(lines, action.productId, action.quantity)
    case 'REMOVE':
      return CartOps.removeLine(lines, action.productId)
    case 'CLEAR':
      return CartOps.clearCart()
    default:
      return lines
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, [])

  const addProduct = useCallback((productId: string) => {
    dispatch({ type: 'ADD', productId })
  }, [])

  const setQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'SET_QTY', productId, quantity })
  }, [])

  const removeLine = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE', productId })
  }, [])

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [])

  const totalItems = useMemo(
    () => lines.reduce((acc, l) => acc + l.quantity, 0),
    [lines],
  )

  const value = useMemo(
    () => ({
      lines,
      totalItems,
      addProduct,
      setQuantity,
      removeLine,
      clear,
    }),
    [lines, totalItems, addProduct, setQuantity, removeLine, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
