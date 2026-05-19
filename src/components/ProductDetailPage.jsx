import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'

function ProductDetailPage() {
  const { productId } = useParams()
  const product = getProductById(productId)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const { addToCart } = useCart()
  const buttonRef = useRef(null)

  if (!product) {
    return <Navigate replace to="/shop" />
  }

  useEffect(() => {
    setActiveImageIndex(0)
  }, [productId])

  const handleAddToCart = () => {
    addToCart(product)
    if (buttonRef.current) {
      buttonRef.current.classList.remove('pulse')
      void buttonRef.current.offsetWidth
      buttonRef.current.classList.add('pulse')
      setTimeout(() => buttonRef.current?.classList.remove('pulse'), 600)
    }
  }

  useEffect(() => {
    if (isCarouselPaused || product.images.length <= 1) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((current) =>
        current === product.images.length - 1 ? 0 : current + 1
      )
    }, 3000)

    return () => window.clearInterval(intervalId)
  }, [isCarouselPaused, product.images.length])

  return (
    <div className="pdp-layout">
      {/* ════════════════════════════════════════════════════
          LEFT: Image Gallery
          ════════════════════════════════════════════════════ */}
      <div className="pdp-gallery">
        <div
          aria-live="polite"
          className="pdp-gallery__frame"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
        >
          <div
            className="pdp-gallery__track"
            style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
          >
            {product.images.map((image) => (
              <div className="pdp-gallery__slide" key={image.id}>
                {image.src ? (
                  <img src={image.src} alt={image.label} />
                ) : (
                  <>
                    <span aria-hidden="true">✟</span>
                    <strong>{image.label}</strong>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div aria-label="Product images" className="pdp-gallery__dots">
          {product.images.map((image, index) => (
            <button
              aria-label={`View ${image.label}`}
              aria-pressed={index === activeImageIndex}
              className={`pdp-gallery__dot ${
                index === activeImageIndex ? 'pdp-gallery__dot--active' : ''
              }`}
              key={image.id}
              onClick={() => setActiveImageIndex(index)}
              type="button"
            />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          RIGHT: Product Info
          ════════════════════════════════════════════════════ */}
      <article className="pdp-info">
        <Link className="pdp-back" to="/shop">
          ← Back to Shop
        </Link>

        <p className="pdp-kicker">{product.category}</p>

        <h1 className="pdp-name">{product.name}</h1>

        <p className="pdp-price">{product.price}</p>

        <div className="pdp-divider" aria-hidden="true" />

        <p className="pdp-desc">{product.description}</p>

        <ul className="pdp-details">
          {product.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>

        <div className="pdp-actions">
          <button
            ref={buttonRef}
            className="btn btn-primary btn-add-to-cart"
            onClick={handleAddToCart}
            type="button"
          >
            Add to Cart
          </button>
          <Link className="btn btn-secondary" to="/shop">
            Continue Shopping
          </Link>
        </div>
      </article>
    </div>
  )
}

export default ProductDetailPage
