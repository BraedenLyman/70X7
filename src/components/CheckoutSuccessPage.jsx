import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CheckoutSuccessPage() {
  const { clearCart } = useCart()
  const [searchParams] = useSearchParams()
  const paymentIntentId = searchParams.get('payment_intent')

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <>
      <header className="crt-hero">
        <div className="crt-hero__left">
          <p className="ab-kicker">Order Complete</p>
          <h1 className="crt-hero__title">Thank You!</h1>
        </div>
      </header>

      <div className="chk-success">
        <div className="chk-success__icon">✓</div>
        <h2 className="chk-success__heading">Your order has been confirmed.</h2>
        <p className="chk-success__message">
          We've sent a confirmation email with your order details. You can track your shipment
          status from there.
        </p>

        {paymentIntentId && (
          <div className="chk-success__reference">
            <p className="chk-success__label">Order Reference</p>
            <p className="chk-success__id">{paymentIntentId}</p>
          </div>
        )}

        <Link className="btn btn-primary" to="/shop">
          Continue Shopping
        </Link>
      </div>
    </>
  )
}

export default CheckoutSuccessPage
