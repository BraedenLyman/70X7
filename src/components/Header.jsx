import { useState } from 'react'
import { HiBars3, HiXMark } from 'react-icons/hi2'
import { Link, NavLink } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navClass = ({ isActive }) =>
    isActive ? 'site-nav__link site-nav__link-active' : 'site-nav__link'

  function handleToggleMenu() {
    setIsMenuOpen((current) => !current)
  }

  function handleCloseMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-logo" to="/" onClick={handleCloseMenu}>
          70<span>X7</span>
        </Link>
        <button
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="site-header__menu-toggle"
          onClick={handleToggleMenu}
          type="button"
        >
          {isMenuOpen ? <HiXMark /> : <HiBars3 />}
        </button>
        <nav
          aria-label="Primary"
          className={`site-nav ${isMenuOpen ? 'site-nav-open' : ''}`}
          id="primary-navigation"
        >
          <NavLink className={navClass} end to="/" onClick={handleCloseMenu}>
            Home
          </NavLink>
          <NavLink className={navClass} to="/shop" onClick={handleCloseMenu}>
            Shop
          </NavLink>
          <NavLink className={navClass} to="/contact" onClick={handleCloseMenu}>
            Contact
          </NavLink>
          <NavLink className={navClass} to="/about" onClick={handleCloseMenu}>
            About
          </NavLink>
          <button className="site-header__cta site-header__cta-mobile" type="button">
            Cart
          </button>
        </nav>
        <button className="site-header__cta site-header__cta-desktop" type="button">
          Cart
        </button>
      </div>
    </header>
  )
}

export default Header
