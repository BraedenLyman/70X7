const shopItems = [
  {
    id: 'tee-core-black',
    name: 'Core Lift Tee',
    category: 'T-Shirt',
    color: 'Black',
    price: '$42',
    tag: 'Best Seller',
  },
  {
    id: 'tee-blood-red',
    name: 'Bloodline Oversized Tee',
    category: 'T-Shirt',
    color: 'Red',
    price: '$46',
    tag: 'New',
  },
  {
    id: 'sweat-iron-black',
    name: 'Iron Heavy Sweater',
    category: 'Sweater',
    color: 'Black',
    price: '$74',
    tag: 'Restock',
  },
  {
    id: 'sweat-cutoff-red',
    name: 'Cutoff Pump Sweater',
    category: 'Sweater',
    color: 'Red',
    price: '$79',
    tag: 'Limited',
  },
  {
    id: 'tee-pr-day',
    name: 'PR Day Tee',
    category: 'T-Shirt',
    color: 'Black',
    price: '$44',
    tag: 'Popular',
  },
  {
    id: 'sweat-warmup',
    name: 'Warmup Club Sweater',
    category: 'Sweater',
    color: 'Black',
    price: '$76',
    tag: 'New',
  },
]

function ShopPage() {
  return (
    <>
      <section className="shop-hero">
        <p className="hero-kicker">70X7 shop</p>
        <h1>Gear up for every session.</h1>
        <p>
          Performance tees and heavyweight sweaters built for hard lifts and
          clean everyday wear.
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
          <button type="button" className="chip">
            Sweaters
          </button>
        </div>
        <p className="shop-count">{shopItems.length} products</p>
      </section>

      <section className="shop-grid" aria-label="Products">
        {shopItems.map((item) => (
          <article key={item.id} className="product-card">
            <div className="product-card__image" aria-hidden="true">
              <span>{item.category}</span>
            </div>
            <div className="product-card__content">
              <p className="product-card__tag">{item.tag}</p>
              <h2>{item.name}</h2>
              <p className="product-card__meta">
                {item.category} | {item.color}
              </p>
              <div className="product-card__bottom">
                <strong>{item.price}</strong>
                <button className="btn btn-primary" type="button">
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

export default ShopPage
