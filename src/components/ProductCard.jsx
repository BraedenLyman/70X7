import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="product-card" aria-label={product.name}>
      <div className="product-card__image">
        {product.images[0]?.src ? (
          <img src={product.images[0].src} alt={product.name} />
        ) : (
          <span className="product-card__image-cross" aria-hidden="true">
            ✟
          </span>
        )}
        <span className="product-card__cat-badge">{product.category}</span>
      </div>

      <div className="product-card__body">
        <div className="product-card__top-row">
          <p className="product-card__tag">{product.tag}</p>
          <p className="product-card__price">{product.price}</p>
        </div>

        <h2 className="product-card__name">{product.name}</h2>

        <p className="product-card__desc">{product.description}</p>

        <div className="product-card__actions">
          <button
            className="btn btn-secondary"
            onClick={() => addToCart(product)}
            type="button"
          >
            Add to Cart
          </button>
          <Link className="btn btn-primary" to={`/shop/${product.id}`}>
            View Product
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
