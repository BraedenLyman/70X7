import { Link } from 'react-router-dom'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__brand">70X7</p>
        <p className="site-footer__tagline">Built on Faith. Forged with Purose | &copy; {year} 70X7. All rights reserved.</p>
  
        <nav aria-label="Footer" className="site-footer__links">
          <Link to="/shop">Shop</Link>
          <Link to="/shipping">Shipping/Returns</Link>
          <Link to="/terms-of-service">Terms Of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
