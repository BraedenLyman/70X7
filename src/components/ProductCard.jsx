import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article aria-label={product.name} className="product-card">
      <div className="product-card__image" aria-hidden="true">
        <span>{product.category}</span>
      </div>
      <div className="product-card__content">
        <p className="product-card__tag">{product.tag}</p>
        <p className="product-card__price">{product.price}</p>
        <h2>{product.name}</h2>
        <p className="product-card__meta">
          {product.category} {product.color}
        </p>
      </div>
      <div className="product-card__bottom">
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
