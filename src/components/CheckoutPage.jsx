import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '../context/CartContext'

const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function CheckoutPage() {
  const navigate = useNavigate()
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
        <CheckoutForm items={items} subtotal={subtotal} clientSecret={clientSecret} navigate={navigate} />
      </Elements>
    </>
  )
}

function CheckoutForm({ items, subtotal, clientSecret, navigate }) {
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
    postal_code: '',
    country: 'Canada',
    apartment: '',
    deliveryInstructions: '',
  })
  const [shippingRates, setShippingRates] = useState([])
  const [selectedShipping, setSelectedShipping] = useState(null)
  const [shippingLoading, setShippingLoading] = useState(false)
  const [hasAttemptedShipping, setHasAttemptedShipping] = useState(false)
  const addressInputRef = useRef(null)
  const [autocomplete, setAutocomplete] = useState(null)
  const debounceTimerRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    if (!selectedShipping) {
      setErrorMessage('Please select a shipping method')
      return
    }

    setLoading(true)
    setErrorMessage(null)

    try {
      // Create a new payment intent with shipping included
      const totalAmount = Math.round(subtotal * 100) + Math.round(selectedShipping.amount * 100)

      const intentResponse = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          shippingAmount: Math.round(selectedShipping.amount * 100),
        }),
      })

      const intentData = await intentResponse.json()
      if (intentData.error) {
        throw new Error(intentData.error)
      }

      const cardElement = elements.getElement(CardElement)

      const { error, paymentIntent } = await stripe.confirmCardPayment(intentData.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: shippingData.name,
            email: shippingData.email,
          },
        },
        shipping: {
          name: shippingData.name,
          address: {
            line1: shippingData.address,
            city: shippingData.city,
            state: shippingData.province,
            country: shippingData.country === 'Canada' ? 'CA' : 'US',
          },
        },
      })

      if (error) {
        setErrorMessage(error.message)
        setLoading(false)
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        navigate('/checkout/success', { replace: true })
      }
    } catch (err) {
      setErrorMessage(err.message)
      setLoading(false)
    }
  }

  // Initialize Google Places autocomplete
  useEffect(() => {
    if (!addressInputRef.current || !window.google) return

    const autocompleteInstance = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      componentRestrictions: { country: ['ca'] },
      types: ['address'],
    })

    autocompleteInstance.addListener('place_changed', () => {
      const place = autocompleteInstance.getPlace()
      if (!place.geometry) return

      const addressComponents = place.address_components
      let address = ''
      let city = ''
      let province = ''
      let postalCode = ''

      addressComponents.forEach(component => {
        if (component.types.includes('street_number')) {
          address = component.long_name + ' ' + address
        }
        if (component.types.includes('route')) {
          address += component.long_name
        }
        if (component.types.includes('locality')) {
          city = component.long_name
        }
        if (component.types.includes('administrative_area_level_1')) {
          province = component.short_name
        }
        if (component.types.includes('postal_code')) {
          postalCode = component.long_name
        }
      })

      setShippingData((prev) => ({
        ...prev,
        address: address.trim(),
        city,
        province,
        postal_code: postalCode,
      }))

      // Calculate shipping after address is set
      setTimeout(() => calculateShipping({ address: address.trim(), city, province, postal_code: postalCode }), 0)
    })

    setAutocomplete(autocompleteInstance)
  }, [])

  const calculateShipping = async (addressData) => {
    setShippingLoading(true)
    setShippingRates([])
    setSelectedShipping(null)
    setHasAttemptedShipping(true)

    try {
      // Validate required fields
      if (!addressData.address || !addressData.city || !addressData.province || !addressData.postal_code) {
        setShippingLoading(false)
        return
      }

      const totalWeight = items.reduce((sum, item) => sum + (item.weight || 0.25) * item.quantity, 0)

      // Log individual items and totals
      console.log('📦 Cart Items - Weight & Dimensions:')
      let totalLength = 0
      let totalWidth = 0
      let totalHeight = 0

      items.forEach((item) => {
        const itemWeight = (item.weight || 0.25) * item.quantity
        const dims = item.dimensions || { length: 30, width: 25, height: 5 }
        const totalItemHeight = dims.height * item.quantity

        totalLength = Math.max(totalLength, dims.length)
        totalWidth = Math.max(totalWidth, dims.width)
        totalHeight += totalItemHeight

        console.log(
          `  ${item.name} (qty: ${item.quantity}):`,
          `Weight: ${itemWeight.toFixed(2)}kg`,
          `Dimensions: ${dims.length}×${dims.width}×${totalItemHeight}cm`
        )
      })

      console.log(
        '📊 Order Totals:',
        `Total Weight: ${totalWeight.toFixed(2)}kg`,
        `Total Dimensions: ${totalLength}×${totalWidth}×${totalHeight}cm`
      )

      const response = await fetch('http://localhost:8787/api/calculate-shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: {
            street1: addressData.address,
            city: addressData.city,
            province: addressData.province,
            postal_code: addressData.postal_code,
            name: shippingData.name,
            country: shippingData.country,
          },
          weight: totalWeight,
        }),
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      const data = await response.json()
      if (data.error) {
        console.error('Shipping error:', data.error)
        setShippingRates([])
      } else if (data.rates && Array.isArray(data.rates)) {
        setShippingRates(data.rates)
      } else {
        setShippingRates([])
      }
    } catch (err) {
      console.error('Shipping calculation error:', err)
      setShippingRates([])
    } finally {
      setShippingLoading(false)
    }
  }

  const handleShippingChange = (e) => {
    const { name, value } = e.target
    setShippingData((prev) => ({ ...prev, [name]: value }))

    // Debounce address field to wait for user to finish typing
    if (name === 'address') {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = setTimeout(() => {
        if (value && shippingData.city && shippingData.province && shippingData.postal_code) {
          calculateShipping({ address: value, city: shippingData.city, province: shippingData.province, postal_code: shippingData.postal_code })
        }
      }, 800)
    }
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
                ref={addressInputRef}
                name="address"
                type="text"
                required
                value={shippingData.address}
                onChange={handleShippingChange}
                placeholder="Start typing your address..."
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
                name="postal_code"
                type="text"
                required
                value={shippingData.postal_code}
                onChange={handleShippingChange}
              />
            </div>

            <div className="chk-field">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                value="Canada"
                disabled
              />
            </div>

            <div className="chk-field chk-field--full">
              <label htmlFor="apartment">Apartment, Suite, or Building Number (Optional)</label>
              <input
                id="apartment"
                name="apartment"
                type="text"
                value={shippingData.apartment}
                onChange={handleShippingChange}
                placeholder="e.g., Apt 201, Suite 100, Building A"
              />
            </div>

            <div className="chk-field chk-field--full">
              <label htmlFor="deliveryInstructions">Delivery Instructions (Optional)</label>
              <textarea
                id="deliveryInstructions"
                name="deliveryInstructions"
                value={shippingData.deliveryInstructions}
                onChange={handleShippingChange}
                placeholder="e.g., Leave at front door, Ring doorbell twice, Gate code: 1234"
                rows="3"
              />
            </div>
          </div>
        </div>

        <div className="chk-section">
          <h2 className="chk-section__title">Payment Method</h2>
          <div className="chk-card-input">
            <CardElement options={{ hidePostalCode: true, style: { base: { color: '#f0f0f0', fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '16px', '::placeholder': { color: '#999999' } }, invalid: { color: '#e05252' } } }} />
          </div>

          {shippingLoading && <p className="chk-shipping__loading">Calculating shipping rates...</p>}

          {!shippingLoading && hasAttemptedShipping && shippingData.address && shippingRates.length === 0 && (
            <p className="chk-shipping__no-rates">No shipping rates available at this time. Please check your address and try again.</p>
          )}

          {shippingRates.length > 0 && (
            <div className="chk-shipping">
              <h3 className="chk-shipping__title">Shipping Method</h3>
              {shippingRates.map((rate) => (
                <label key={rate.id} className="chk-shipping__option">
                  <input
                    type="radio"
                    name="shipping"
                    value={rate.id}
                    checked={selectedShipping?.id === rate.id}
                    onChange={() => setSelectedShipping(rate)}
                  />
                  <span className="chk-shipping__label">
                    {rate.provider} - {rate.servicelevel}
                    <span className="chk-shipping__price">${rate.amount.toFixed(2)}</span>
                    {rate.estimated_days && <span className="chk-shipping__days">{rate.estimated_days} days</span>}
                  </span>
                </label>
              ))}
            </div>
          )}

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
            <div className="chk-summary__row">
              <span>Shipping {selectedShipping && `(${selectedShipping.servicelevel})`}</span>
              <strong>{selectedShipping ? `$${selectedShipping.amount.toFixed(2)}` : 'waiting to be calculated'}</strong>
            </div>
            <div className="chk-summary__total">
              <span>Total</span>
              <strong>${(Math.round(subtotal) + (selectedShipping?.amount || 0)).toFixed(2)}</strong>
            </div>
          </div>

          {errorMessage && <div className="chk-error-message">{errorMessage}</div>}

          <button
            type="submit"
            className="btn btn-primary chk-submit"
            disabled={!stripe || loading || !selectedShipping || shippingLoading}
            title={!selectedShipping ? 'Please select a shipping method' : shippingLoading ? 'Calculating shipping...' : ''}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default CheckoutPage
