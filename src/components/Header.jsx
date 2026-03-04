import { Link, NavLink } from 'react-router-dom'

function Header() {
  const navClass = ({ isActive }) =>
    isActive ? 'site-nav__link site-nav__link-active' : 'site-nav__link'

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-logo" to="/">
          70<span>X7</span>
        </Link>
        <nav aria-label="Primary" className="site-nav">
          <NavLink className={navClass} end to="/">
            Home
          </NavLink>
          <NavLink className={navClass} to="/shop">
            Shop
          </NavLink>
          <NavLink className={navClass} to="contact">
            Contact
          </NavLink>
          <NavLink className={navClass} to="/about">
            About
          </NavLink>
        </nav>
        <button className="site-header__cta" type="button">
          Cart
        </button>
      </div>
    </header>
  )
}

export default Header
