import { Link } from 'react-router-dom'

const values = [
  {
    title: 'Discipline',
    detail: 'Every piece is designed around consistency, work ethic, and daily progress.',
  },
  {
    title: 'Durability',
    detail: 'We prioritize heavyweight fabrics and construction that hold up to hard training.',
  },
  {
    title: 'Identity',
    detail: '70X7 blends gym performance with clean street-ready style.',
  },
]

function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <p className="hero-kicker">About 70X7</p>
        <h1>Built from training culture.</h1>
        <p>
          70X7 is a gymwear brand created for lifters who expect more from what
          they wear: better fit, stronger materials, and a sharper presence.
        </p>
      </section>

      <section className="about-grid">
        <article className="about-card">
          <h2>Our Mission</h2>
          <p>
            We build apparel that performs in the gym and looks clean outside of
            it, so your standards stay the same in every setting.
          </p>
        </article>
        <article className="about-card">
          <h2>Our Standard</h2>
          <p>
            Limited drops, quality-first production, and intentional design.
            Nothing overdone, nothing weak.
          </p>
        </article>
      </section>

      <section className="about-values">
        <p className="split-kicker">What We Stand For</p>
        <h2>More than gym clothing.</h2>
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
