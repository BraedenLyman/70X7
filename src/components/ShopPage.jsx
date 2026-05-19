import ProductCard from './ProductCard'
import { products } from '../data/products'

function ShopPage() {
  return (
    <>
      {/* Shop page header */}
      <section className="sp-header">
        <div className="sp-header__left">
          <p className="sp-header__kicker">The Collection</p>
          <h1 className="sp-header__title">Shop All</h1>
        </div>
        <div className="sp-header__right">
          <p className="sp-header__count">{products.length} Products</p>
        </div>
      </section>

      {/* Products grid */}
      <section className="sp-grid" aria-label="Products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  )
}

export default ShopPage
