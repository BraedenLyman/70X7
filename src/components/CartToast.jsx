import { useCart } from '../context/CartContext'

export default function CartToast() {
  const { lastAdded } = useCart()

  if (!lastAdded) return null

  return (
    <div className="cart-toast">
      <span className="cart-toast__check">✓</span>
      <span>{lastAdded} added to cart</span>
    </div>
  )
}
