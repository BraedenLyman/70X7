import { Link } from 'react-router-dom'

const featuredCategories = [
  {
    id: 'tee-nwfam',
    name: 'No Weapons Formed Against Me',
    category: 'T-Shirt',
    price: '$40',
    tag: 'Popular',
  },
  {
    id: 'tee-mstrs',
    name: 'Moses Splitting The Red Sea',
    category: 'T-Shirt',
    price: '$40',
    tag: 'Popular',
  },
]

const brandPillars = [
  'Faith-led design language inspired by scripture',
  'Durable premium fabrics made for everyday life',
  'Purpose-driven drops with bold Christian messaging',
]

function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="hero-kicker">Faith Over Fear</p>
        <h1 className="brand-name">
          70<span>X7</span>
        </h1>
        <p className="brand-tagline">Endless forgiveness.</p>
        <h2>Wear your faith. <br/> Make a statement.</h2>
      
        <p className="hero-message">This isn’t just clothing - it’s a message.</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/shop">
            Shop T-Shirts
          </Link>
        
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <p>Featured Shirts</p>
          <h3>Wear conviction with confidence.</h3>
        </div>
        <div className="shop-grid featured-grid">
          {featuredCategories.map((item) => (
            <article key={item.id} className="product-card">
              <div className="product-card__image" aria-hidden="true">
                <span>{item.category}</span>
              </div>
              <div className="product-card__content">
                <p className="product-card__tag">{item.tag}</p>
                <h2>{item.name}</h2>
                <p className="product-card__meta">{item.category}</p>
              </div>
              <div className="product-card__bottom">
                <strong>{item.price}</strong>
                <Link className="btn btn-primary" to="/shop">
                  Explore
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section split-section">
        <div className="split-section__content">
          <p className="split-kicker">Why 70X7</p>
          <h3>Designed to reflect your faith publicly.</h3>
          <ul className="pillar-list">
            {brandPillars.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <aside className="split-section__quote">
          <p className="split-section__quote-title">Community Feedback</p>
          <p className="split-section__quote-text">
            "The quality is strong, and the message is even stronger. 70X7 lets
            me represent my faith with confidence every time I step out."
          </p>
          <span>Verified Buyer | Ontario, CA</span>
        </aside>
      </section>

      <section className="home-cta">
        <p>Join the 70X7 movement</p>
        <h3>New collection coming soon.</h3>
        <button className="btn btn-primary" type="button">
          Get Drop Alerts
        </button>
      </section>
    </>
  )
}

export default HomePage
