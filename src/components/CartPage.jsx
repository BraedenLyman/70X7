import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
  }).format(value)
}

function getLineTotal(price, quantity) {
  const amount = Number(price.replace(/[^0-9.]/g, ''))
  return formatCurrency(amount * quantity)
}

function CartPage() {
  const navigate = useNavigate()
  const {
    cartCount,
    clearCart,
    items,
    removeFromCart,
    subtotal,
    updateQuantity,
  } = useCart()

  const shipping = 0
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <>
        <header className="crt-hero">
          <div className="crt-hero__left">
            <p className="ab-kicker">Your Cart</p>
            <h1 className="crt-hero__title">Your cart is empty.</h1>
          </div>
        </header>
        <div className="crt-empty-body">
          <p>Add a few pieces from the shop to start building your order.</p>
          <Link className="btn btn-primary" to="/shop">
            Continue Shopping
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <header className="crt-hero">
        <div className="crt-hero__left">
          <p className="ab-kicker">Your Cart</p>
          <h1 className="crt-hero__title">Review your order.</h1>
        </div>
        <p className="crt-hero__count">
          {cartCount} item{cartCount !== 1 ? 's' : ''}
        </p>
      </header>

      <div className="crt-layout">
        <div className="crt-list">
          {items.map((item) => (
            <article className="crt-item" key={item.id}>
              <div className="crt-item__image" aria-label={`${item.name} product image`}>
                {item.images && item.images[0]?.src ? (
                  <img src={item.images[0].src} alt={item.name} />
                ) : (
                  <span aria-hidden="true">✟</span>
                )}
              </div>

              <div className="crt-item__body">
                <div className="crt-item__top">
                  <div>
                    <p className="ab-kicker">{item.category}</p>
                    <h2 className="crt-item__name">{item.name}</h2>
                  </div>
                  <strong className="crt-item__price">{item.price}</strong>
                </div>

                <div className="crt-item__footer">
                  <div className="crt-item__qty" aria-label={`Quantity for ${item.name}`}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      type="button"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      type="button"
                    >
                      +
                    </button>
                  </div>

                  <p className="crt-item__line">{getLineTotal(item.price, item.quantity)}</p>

                  <button
                    className="crt-item__remove"
                    onClick={() => removeFromCart(item.id)}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="crt-summary">
          <p className="ab-kicker">Order Summary</p>
          <div className="crt-summary__rows">
            <div className="crt-summary__row">
              <span>Shipping</span>
              <strong className="crt-summary__shipping-note">Calculated on next page</strong>
            </div>
            <div className="crt-summary__row crt-summary__row--total">
              <span>Subtotal</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/checkout')} type="button">
            Proceed to Checkout
          </button>
          <Link className="btn btn-secondary" to="/shop">
            Continue Shopping
          </Link>
          <button className="crt-clear" onClick={clearCart} type="button">
            Clear Cart
          </button>
        </aside>
      </div>
    </>
  )
}

export default CartPage
