import { Link } from 'react-router-dom'

const values = [
  {
    title: 'Forgiveness',
    detail: 'Our name reflects Matthew 18:22 and the call to forgive without limits.',
  },
  {
    title: 'Bold Witness',
    detail: 'Every drop is built to spark conversation and represent faith publicly.',
  },
  {
    title: 'Purpose',
    detail: 'We design with intention so every piece carries meaning beyond style.',
  },
]

function AboutPage() {
  return (
    <>
      {/* Section 1: Page Header */}
      <header className="ab-hero">
        <div className="ab-hero__left">
          <p className="ab-kicker">About 70X7</p>
          <h1 className="ab-hero__title">Our Story</h1>
        </div>
        <p className="ab-hero__lead" />
        <div className="ab-hero__rule" aria-hidden="true" />
      </header>

      {/* Sections 2-4: Content Grid (3-column layout) */}
      <div className="ab-content-grid">
        <section className="ab-section">
          <h2 className="ab-section__heading">Built on faith and conviction.</h2>
          <p className="ab-section__body">
            70X7 is a Christian apparel brand created to help believers wear their faith boldly through premium, statement-driven design.
          </p>
        </section>

        <section className="ab-section">
          <p className="ab-kicker">Our Mission</p>
          <h2 className="ab-section__heading">Conviction into everyday life.</h2>
          <p className="ab-section__body">
            We create clothing that carries scripture-inspired conviction into everyday life with
            confidence and clarity.
          </p>
        </section>

        <section className="ab-section">
          <p className="ab-kicker">Our Standard</p>
          <h2 className="ab-section__heading">Quality without compromise.</h2>
          <p className="ab-section__body">
            Meaningful messaging, quality-first production, and intentional design in every release.
          </p>
        </section>

        <section className="ab-section">
          <p className="ab-kicker">Giving Back</p>
          <h2 className="ab-section__heading">Helping those in need.</h2>
          <p className="ab-section__body">
            We believe in giving back. A portion of proceeds from every purchase supports the
            homeless and people in need, creating meaningful change in communities we serve.
          </p>
        </section>
      </div>

      {/* Section 5: Core Values */}
      <section className="ab-values">
        <div className="ab-values__header">
          <p className="ab-kicker">Core Beliefs</p>
          <h2 className="ab-values__heading">What We Stand For</h2>
        </div>
        <div className="ab-values__grid">
          {values.map((item) => (
            <div key={item.title} className="ab-value-card">
              <span className="ab-value-card__icon" aria-hidden="true">
                ✟
              </span>
              <h3 className="ab-value-card__title">{item.title}</h3>
              <p className="ab-value-card__detail">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="ab-cta">
        <p className="ab-kicker">Ready to shop?</p>
        <h2 className="ab-cta__heading">Explore the Collection</h2>
        <Link className="btn btn-primary ab-cta__btn" to="/shop">
          Shop Now
        </Link>
      </section>
    </>
  )
}

export default AboutPage
