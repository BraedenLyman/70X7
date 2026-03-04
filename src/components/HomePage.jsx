import { Link } from 'react-router-dom'

const featuredCategories = [
  {
    name: 'Performance Tees',
    detail: 'Lightweight cuts for training days, oversized fits for rest days.',
    badge: 'Best Seller',
  },
  {
    name: 'Heavyweight Sweaters',
    detail: 'Premium fleece layers made for warmups, cooldowns, and daily wear.',
    badge: 'New Drop',
  },
]

const brandPillars = [
  'Athletic fit patterns tested for movement',
  'Durable cotton blends built for repeat wear',
  'Minimal but aggressive 70X7 identity',
]

function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="hero-kicker">Gymwear for discipline</p>
        <h1 className="brand-name">
          70<span>X7</span>
        </h1>
        <p className="brand-tagline">Built for reps. Ready for streets.</p>
        <h2>Strength-first apparel</h2>
        <p>
          Clean silhouettes, heavyweight quality, and bold contrast for athletes
          who train hard and keep standards high.
        </p>
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
          <h3>Train heavy. Dress sharper.</h3>
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
          <h3>Designed for lifters, not just looks.</h3>
          <ul className="pillar-list">
            {brandPillars.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <aside className="split-section__quote">
          <p className="split-section__quote-title">Community Feedback</p>
          <p className="split-section__quote-text">
            "70X7 is the only gymwear brand I can train in and still wear all
            day. The fit is sharp, the fabric is heavyweight, and it holds up
            after hard sessions."
          </p>
          <span>Verified Buyer | Toronto, ON</span>
        </aside>
      </section>

      <section className="home-cta">
        <p>Join the 70X7 movement</p>
        <h3>First access to every new drop.</h3>
        <button className="btn btn-primary" type="button">
          Get Drop Alerts
        </button>
      </section>
    </>
  )
}

export default HomePage
