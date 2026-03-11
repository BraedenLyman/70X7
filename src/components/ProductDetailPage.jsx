import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'

function ProductDetailPage() {
  const { productId } = useParams()
  const product = getProductById(productId)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const { addToCart } = useCart()

  if (!product) {
    return <Navigate replace to="/shop" />
  }

  useEffect(() => {
    setActiveImageIndex(0)
  }, [productId])

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
    <>
      <section className="product-detail-hero">
        <p className="hero-kicker">{product.category}</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </section>

      <section className="product-detail">
        <div className="product-detail__gallery">
          <div
            aria-live="polite"
            className="product-detail__frame"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <div
              className="product-detail__track"
              style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
            >
              {product.images.map((image) => (
                <div className="product-detail__image" key={image.id}>
                  <span className="product-detail__image-type">{product.category}</span>
                  <strong>{image.label}</strong>
                  <p>{product.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div aria-label="Product images" className="product-detail__dots">
            {product.images.map((image, index) => (
              <button
                aria-label={`View ${image.label}`}
                aria-pressed={index === activeImageIndex}
                className={`product-detail__dot ${
                  index === activeImageIndex ? 'product-detail__dot-active' : ''
                }`}
                key={image.id}
                onClick={() => setActiveImageIndex(index)}
                type="button"
              >
                <span className="product-detail__dot-inner" />
              </button>
            ))}
          </div>

          <div className="product-detail__status">
            <span>
              {activeImageIndex + 1} / {product.images.length}
            </span>
            <span>{isCarouselPaused ? 'Paused' : 'Auto rotating'}</span>
          </div>
        </div>

        <article className="product-detail__info">
          <p className="product-detail__tag">{product.tag}</p>
          <h2>{product.name}</h2>
          <p className="product-detail__meta">
            {product.category} {product.color}
          </p>
          <p className="product-detail__price">{product.price}</p>
          <p className="product-detail__copy">{product.description}</p>

          <ul className="product-detail__details">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>

          <div className="product-detail__actions">
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product)}
              type="button"
            >
              Add to Cart
            </button>
            <Link className="btn btn-secondary" to="/shop">
              Back to Shop
            </Link>
          </div>
        </article>
      </section>
    </>
  )
}

export default ProductDetailPage
