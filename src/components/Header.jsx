import { useState } from 'react'
import { HiBars3, HiXMark } from 'react-icons/hi2'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { scrollWindowTop } from '../utils/scrollWindowTop'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartCount } = useCart()
  const navClass = ({ isActive }) =>
    isActive ? 'site-nav__link site-nav__link-active' : 'site-nav__link'

  function handleToggleMenu() {
    setIsMenuOpen((current) => !current)
  }

  function handleCloseMenu() {
    setIsMenuOpen(false)
  }

  function handleNavClick() {
    handleCloseMenu()
    scrollWindowTop()
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-logo" to="/" onClick={handleNavClick}>
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
          <NavLink className={navClass} end to="/" onClick={handleNavClick}>
            Home
          </NavLink>
          <NavLink className={navClass} to="/shop" onClick={handleNavClick}>
            Shop
          </NavLink>
          <NavLink className={navClass} to="/contact" onClick={handleNavClick}>
            Contact
          </NavLink>
          <NavLink className={navClass} to="/about" onClick={handleNavClick}>
            About
          </NavLink>
          <NavLink className={navClass} to="/cart" onClick={handleNavClick}>
            Cart ({cartCount})
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
