import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '../context/CartContext'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function CheckoutPage() {
  const { items, subtotal } = useCart()
  const [clientSecret, setClientSecret] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function createPaymentIntent() {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items }),
        })

        if (!response.ok) {
          throw new Error('Failed to create payment intent')
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (items.length > 0) {
      createPaymentIntent()
    }
  }, [items])

  if (loading) {
    return (
      <div className="chk-loading">
        <p>Preparing checkout...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="chk-error">
        <p>Error: {error}</p>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="chk-error">
        <p>Unable to initialize checkout. Please try again.</p>
      </div>
    )
  }

  return (
    <>
      <header className="crt-hero">
        <div className="crt-hero__left">
          <p className="ab-kicker">Secure Checkout</p>
          <h1 className="crt-hero__title">Complete Your Order</h1>
        </div>
      </header>

      <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', variables: { colorPrimary: '#b89449', colorBackground: '#0d0d0d', colorText: '#f0f0f0', colorDanger: '#e05252', fontFamily: 'system-ui, -apple-system, sans-serif', borderRadius: '8px' } } }}>
        <CheckoutForm items={items} subtotal={subtotal} />
      </Elements>
    </>
  )
}

function CheckoutForm({ items, subtotal }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [shippingData, setShippingData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postal: '',
    country: 'Canada',
  })

  async function handleSubmit(e) {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setErrorMessage(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        shipping: {
          name: shippingData.name,
          address: {
            line1: shippingData.address,
            city: shippingData.city,
            state: shippingData.province,
            postal_code: shippingData.postal,
            country: shippingData.country === 'Canada' ? 'CA' : 'US',
          },
        },
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
  }

  const handleShippingChange = (e) => {
    const { name, value } = e.target
    setShippingData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="chk-form-wrapper">
      <div className="chk-layout">
        <div className="chk-section">
          <h2 className="chk-section__title">Shipping Details</h2>
          <div className="chk-form">
            <div className="chk-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={shippingData.name}
                onChange={handleShippingChange}
              />
            </div>

            <div className="chk-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={shippingData.email}
                onChange={handleShippingChange}
              />
            </div>

            <div className="chk-field chk-field--full">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                required
                value={shippingData.address}
                onChange={handleShippingChange}
              />
            </div>

            <div className="chk-field">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                required
                value={shippingData.city}
                onChange={handleShippingChange}
              />
            </div>

            <div className="chk-field">
              <label htmlFor="province">Province</label>
              <input
                id="province"
                name="province"
                type="text"
                required
                value={shippingData.province}
                onChange={handleShippingChange}
              />
            </div>

            <div className="chk-field">
              <label htmlFor="postal">Postal Code</label>
              <input
                id="postal"
                name="postal"
                type="text"
                required
                value={shippingData.postal}
                onChange={handleShippingChange}
              />
            </div>

            <div className="chk-field chk-field--full">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={shippingData.country}
                onChange={handleShippingChange}
              >
                <option>Canada</option>
                <option>United States</option>
              </select>
            </div>
          </div>
        </div>

        <div className="chk-section">
          <h2 className="chk-section__title">Payment Method</h2>
          <PaymentElement />

          <div className="chk-summary">
            <h3 className="chk-summary__title">Order Summary</h3>
            <div className="chk-summary__items">
              {items.map((item) => (
                <div key={item.id} className="chk-summary__row">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <strong>
                    $
                    {(
                      Number(item.price.replace(/[^0-9.]/g, '')) * item.quantity
                    ).toFixed(0)}
                  </strong>
                </div>
              ))}
            </div>
            <div className="chk-summary__total">
              <span>Total</span>
              <strong>${Math.round(subtotal)}</strong>
            </div>
          </div>

          {errorMessage && <div className="chk-error-message">{errorMessage}</div>}

          <button
            type="submit"
            className="btn btn-primary chk-submit"
            disabled={!stripe || loading}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default CheckoutPage
