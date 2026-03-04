import { Link } from 'react-router-dom'

function ComingSoonPage({ title }) {
  return (
    <section className="coming-soon">
      <p className="hero-kicker">Page in progress</p>
      <h1>{title}</h1>
      <p>
        This section is being built next. For now, continue shopping the latest
        releases in the main store.
      </p>
      <Link className="btn btn-primary" to="/shop">
        Go to Shop
      </Link>
    </section>
  )
}

export default ComingSoonPage
