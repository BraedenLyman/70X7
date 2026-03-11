import ProductCard from './ProductCard'
import { products } from '../data/products'

function ShopPage() {
  return (
    <>
      <section className="shop-hero">
        <p className="hero-kicker">70X7 shop</p>
        <h1>Faith-wear for everyday witness.</h1>
        <p>
          Scripture-inspired tees and heavyweight sweaters designed to carry
          bold Christian messaging.
        </p>
      </section>

      <section className="shop-toolbar">
        <div className="shop-filters" aria-label="Filter products">
          <button type="button" className="chip chip-active">
            All Products
          </button>
          <button type="button" className="chip">
            T-Shirts
          </button>
        </div>
        <p className="shop-count">{products.length} products</p>
      </section>

      <section className="shop-grid" aria-label="Products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  )
}

export default ShopPage
