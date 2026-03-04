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
      <section className="about-hero">
        <p className="hero-kicker">About 70X7</p>
        <h1>Built on faith and conviction.</h1>
        <p>
          70X7 is a Christian apparel brand created to help believers wear their
          faith boldly through premium, statement-driven design.
        </p>
      </section>

      <section className="about-grid">
        <article className="about-card">
          <h2>Our Mission</h2>
          <p>
            We create clothing that carries scripture-inspired conviction into
            everyday life with confidence and clarity.
          </p>
        </article>
        <article className="about-card">
          <h2>Our Standard</h2>
          <p>
            Meaningful messaging, quality-first production, and intentional
            design in every release.
          </p>
        </article>
      </section>

      <section className="about-values">
        <p className="split-kicker">What We Stand For</p>
        <h2>More than apparel.</h2>
        <div className="about-values__grid">
          {values.map((item) => (
            <article key={item.title} className="about-value-card">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready to wear 70X7?</h2>
        <Link className="btn btn-primary" to="/shop">
          Shop Collection
        </Link>
      </section>
    </>
  )
}

export default AboutPage
