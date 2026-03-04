import { Link } from 'react-router-dom'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__brand">70X7</p>
        <p className="site-footer__tagline">Seventy times seven – endless forgiveness.</p>
        <p className="site-footer__copy">
          Built on faith. Forged with purpose. &copy; {year} 70X7. All rights reserved.
        </p>
        <nav aria-label="Footer" className="site-footer__links">
          <Link to="/shipping">Shipping</Link>
          <Link to="/returns">Returns</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
