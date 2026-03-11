import { Link } from 'react-router-dom'
import { scrollWindowTop } from '../utils/scrollWindowTop'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__brand">70X7</p>
        <p className="site-footer__tagline">Built on Faith. Forged with Purose | &copy; {year} 70X7. All rights reserved.</p>
  
        <nav aria-label="Footer" className="site-footer__links">
          <Link onClick={scrollWindowTop} to="/shop">Shop</Link>
          <Link onClick={scrollWindowTop} to="/shipping">Shipping/Returns</Link>
          <Link onClick={scrollWindowTop} to="/terms-of-service">Terms Of Service</Link>
          <Link onClick={scrollWindowTop} to="/privacy">Privacy Policy</Link>
          <Link onClick={scrollWindowTop} to="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
