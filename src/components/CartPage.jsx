import { Link } from 'react-router-dom'
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
      <section className="cart-empty">
        <p className="hero-kicker">Your cart</p>
        <h1>Your cart is currently empty.</h1>
        <p>
          Add a few pieces from the shop to start building your next faith-wear
          order.
        </p>
        <Link className="btn btn-primary" to="/shop">
          Continue Shopping
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="cart-hero">
        <p className="hero-kicker">Your cart</p>
        <h1>Review your order.</h1>
        <p>{cartCount} item(s) ready for checkout.</p>
      </section>

      <section className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item__image" aria-hidden="true">
                <span>{item.category}</span>
              </div>

              <div className="cart-item__content">
                <div className="cart-item__top">
                  <div>
                    <p className="cart-item__tag">{item.tag}</p>
                    <h2>{item.name}</h2>
                    <p className="cart-item__meta">
                      {item.category} | {item.color}
                    </p>
                  </div>
                  <strong className="cart-item__price">{item.price}</strong>
                </div>

                <p className="cart-item__copy">{item.description}</p>

                <div className="cart-item__footer">
                  <div className="cart-item__quantity" aria-label={`Quantity for ${item.name}`}>
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      type="button"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      type="button"
                    >
                      +
                    </button>
                  </div>

                  <p className="cart-item__line-total">{getLineTotal(item.price, item.quantity)}</p>

                  <button
                    className="cart-item__remove"
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

        <aside className="cart-summary">
          <p className="cart-summary__kicker">Order Summary</p>
          <h2>Checkout Preview</h2>

          <div className="cart-summary__rows">
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </div>
            <div className="cart-summary__row">
              <span>Shipping</span>
              <strong>{formatCurrency(shipping)}</strong>
            </div>
            <div className="cart-summary__row cart-summary__row-total">
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
          </div>

          <button className="btn btn-primary" type="button">
            Proceed to Checkout
          </button>
          <Link className="btn btn-secondary" to="/shop">
            Continue Shopping
          </Link>
          <button className="cart-summary__clear" onClick={clearCart} type="button">
            Clear Cart
          </button>
        </aside>
      </section>
    </>
  )
}

export default CartPage
