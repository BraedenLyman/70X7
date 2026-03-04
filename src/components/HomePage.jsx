import { Link } from 'react-router-dom'

const featuredCategories = [
  {
    name: 'Teeshirt 1',
    detail: 'Statement designs grounded in scripture and bold visual storytelling.',
    badge: 'Best Seller',
  },
  {
    name: 'Teeshirt 2',
    detail: 'Statement designs grounded in scripture and bold visual storytelling.',
    badge: 'New Drop',
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
        <p className="brand-tagline">Seventy times seven – endless forgiveness.</p>
        <h2>Wear your faith. Make a statement.</h2>
        <p>
          Built on faith. Forged with purpose.
        </p>
        <p className="hero-message">This isn’t just clothing — it’s a message.</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/tshirts">
            Shop T-Shirts
          </Link>
          <Link className="btn btn-secondary" to="/sweaters">
            Shop Sweaters
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <p>Featured categories</p>
          <h3>Wear conviction with confidence.</h3>
        </div>
        <div className="card-grid">
          {featuredCategories.map((item) => (
            <article key={item.name} className="feature-card">
              <span className="feature-badge">{item.badge}</span>
              <h4>{item.name}</h4>
              <p>{item.detail}</p>
              <Link to="/shop">Explore</Link>
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
