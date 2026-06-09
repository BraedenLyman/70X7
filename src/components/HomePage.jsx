import { Link } from 'react-router-dom'
import { featuredProductIds, products } from '../data/products'

const featuredProducts = products.filter((p) => featuredProductIds.includes(p.id))

function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════
          SECTION 1: FULL-BLEED HERO
          ════════════════════════════════════════════════════ */}
      <section className="hp-hero">
        {/* Decorative background cross */}
        <span className="hp-hero__bg-cross" aria-hidden="true">✟</span>

        {/* Inner container keeps text readable within 1100px */}
        <div className="hp-hero__inner">
          <p className="hp-hero__kicker">Faith Over Fear</p>

          <h1 className="hp-hero__title">
            70<span className="hp-hero__title-gold">X7</span>
          </h1>

          <div className="hp-hero__divider" aria-hidden="true" />

          <p className="hp-hero__tagline">Endless Forgiveness.</p>
          <p className="hp-hero__sub">Wear your faith. Make a statement.</p>

          <div className="hp-hero__actions">
            <Link className="btn btn-primary hp-hero__btn-primary" to="/shop">
              Shop Now
            </Link>
            <Link className="btn btn-ghost" to="/about">
              Our Story
            </Link>
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="hp-hero__strip">
          <div className="hp-hero__strip-inner">
            <span>✟ Faith-Led Design</span>
            <span className="hp-hero__strip-dot" aria-hidden="true">·</span>
            <span>Premium Fabrics</span>
            <span className="hp-hero__strip-dot" aria-hidden="true">·</span>
            <span>Purpose-Driven</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 2: FEATURED PRODUCTS
          ════════════════════════════════════════════════════ */}
      <section className="hp-featured">
        <div className="hp-featured__inner">
          <header className="hp-featured__header">
            <div className="hp-featured__header-top">
              <p className="hp-section-kicker">Featured Products</p>
              <div className="hp-section-rule" aria-hidden="true" />
            </div>
            <p className="hp-featured__sub">Bold pieces for bold believers.</p>
          </header>

          <div className="hp-featured__grid">
            {featuredProducts.map((product) => (
              <article key={product.id} className="hp-product-card">
                <div
                  className="hp-product-card__image"
                  aria-label={`${product.name} product image`}
                >
                  {product.images[0]?.src ? (
                    <img src={product.images[0].src} alt={product.name} />
                  ) : (
                    <>
                      <span className="hp-product-card__image-cross" aria-hidden="true">
                        ✟
                      </span>
                      <p className="hp-product-card__image-label">{product.name}</p>
                    </>
                  )}
                </div>
                <div className="hp-product-card__body">
                  <p className="hp-product-card__tag">{product.tag}</p>
                  <h2 className="hp-product-card__name">{product.name}</h2>
                  <p className="hp-product-card__price">{product.price}</p>
                  <div className="hp-product-card__actions">
                    <Link className="btn btn-primary" to={`/shop/${product.id}`}>
                      View Product
                    </Link>
                    <Link className="btn btn-secondary" to="/shop">
                      Shop All
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 3: BRAND VALUES STRIP
          ════════════════════════════════════════════════════ */}
      <section className="hp-values">
        <div className="hp-values__inner">
          <div className="hp-values__grid">
            <div className="hp-values__pillar">
              <span className="hp-values__icon" aria-hidden="true">
                ✟
              </span>
              <h3 className="hp-values__heading">Scripture-Inspired</h3>
              <p className="hp-values__desc">Every design rooted in God's word.</p>
            </div>
            <div className="hp-values__pillar">
              <span className="hp-values__icon" aria-hidden="true">
                ◈
              </span>
              <h3 className="hp-values__heading">Premium Fabrics</h3>
              <p className="hp-values__desc">Built to last, made to be worn daily.</p>
            </div>
            <div className="hp-values__pillar">
              <span className="hp-values__icon" aria-hidden="true">
                ✦
              </span>
              <h3 className="hp-values__heading">Purpose-Driven</h3>
              <p className="hp-values__desc">Every piece carries a bold message.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 4: STORY + TESTIMONIAL
          ════════════════════════════════════════════════════ */}
      <section className="hp-story">
        <div className="hp-story__inner">
          {/* Left: brand story */}
          <div className="hp-story__left">
            <p className="hp-section-kicker">Why 70X7</p>
            <h2 className="hp-story__heading">
              Designed to Reflect
              <br />
              Your Faith
            </h2>
            <ul className="hp-story__pillars">
              <li>
                <strong>Faith-led design language</strong> inspired by scripture and the stories
                that define us.
              </li>
              <li>
                <strong>Durable premium fabrics</strong> built for everyday life, not just Sunday
                mornings.
              </li>
              <li>
                <strong>Purpose-driven drops</strong> with bold Christian messaging that makes a
                real statement.
              </li>
            </ul>
            <Link className="btn btn-primary" to="/about">
              Our Story
            </Link>
          </div>

          {/* Right: testimonial card */}
          <aside className="hp-story__testimonial" aria-label="Customer testimonial">
            <p className="hp-story__testimonial-kicker">Community Feedback</p>
            <p className="hp-story__testimonial-cross" aria-hidden="true">
              ✟
            </p>
            <blockquote className="hp-story__quote">
              "The quality is strong, and the message is even stronger. 70X7 lets me represent my
              faith with confidence every time I step out."
            </blockquote>
            <footer className="hp-story__testimonial-footer">
              <span>Verified Buyer · Ontario, CA</span>
            </footer>
          </aside>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 5: FULL-BLEED CTA BANNER
          ════════════════════════════════════════════════════ */}
      <section className="hp-cta">
        <div className="hp-cta__inner">
          <p className="hp-section-kicker">Ready to wear your faith?</p>
          <h2 className="hp-cta__heading">Shop the Collection</h2>
          <p className="hp-cta__desc">
            Bold pieces for bold believers. Every drop designed with purpose.
          </p>
          <Link className="btn btn-primary hp-cta__btn" to="/shop">
            Shop Now
          </Link>
        </div>
      </section>
    </>
  )
}

export default HomePage
