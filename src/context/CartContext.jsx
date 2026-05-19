import { createContext, useContext, useMemo, useState, useEffect, useRef, useCallback } from 'react'

const CartContext = createContext(null)

function parsePrice(price) {
  return Number(price.replace(/[^0-9.]/g, ''))
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('70x7-cart')
    return saved ? JSON.parse(saved) : []
  })
  const [lastAdded, setLastAdded] = useState(null)
  const toastTimerRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('70x7-cart', JSON.stringify(items))
  }, [items])

  const addToCart = useCallback((product) => {
    setItems((current) => {
      const existingItem = current.find((item) => item.id === product.id)

      if (existingItem) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...current, { ...product, quantity: 1 }]
    })
    setLastAdded(product.name)
    clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setLastAdded(null), 2500)
  }, [])

  const updateQuantity = useCallback((productId, nextQuantity) => {
    if (nextQuantity <= 0) {
      setItems((current) => current.filter((item) => item.id !== productId))
      return
    }

    setItems((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item
      )
    )
  }, [])

  const removeFromCart = useCallback((productId) => {
    setItems((current) => current.filter((item) => item.id !== productId))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const value = useMemo(
    () => ({
      addToCart,
      cartCount: items.reduce((total, item) => total + item.quantity, 0),
      clearCart,
      items,
      lastAdded,
      removeFromCart,
      subtotal: items.reduce(
        (total, item) => total + parsePrice(item.price) * item.quantity,
        0
      ),
      updateQuantity,
    }),
    [items, lastAdded]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
