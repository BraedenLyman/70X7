import './App.css'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './components/HomePage'
import Footer from './components/Footer'
import Header from './components/Header'
import ShopPage from './components/ShopPage'
import ComingSoonPage from './components/ComingSoonPage'
import ContactPage from './components/ContactPage'
import AboutPage from './components/AboutPage'
import ProductDetailPage from './components/ProductDetailPage'
import { CartProvider } from './context/CartContext'
import CartPage from './components/CartPage'
import ScrollToTop from './components/ScrollToTop'
import CheckoutPage from './components/CheckoutPage'
import CheckoutSuccessPage from './components/CheckoutSuccessPage'
import PageTransition from './components/PageTransition'
import CartToast from './components/CartToast'

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isContact = location.pathname.startsWith('/contact')
  const isCheckout = location.pathname.startsWith('/checkout')

  const routeKey = useLocation().key

  return (
    <CartProvider>
      <div className="site-shell">
        <ScrollToTop />
        <Header />
        <CartToast />
        <main className={isHome ? 'home-main' : isContact || isCheckout ? 'brand-page brand-page--contact' : 'brand-page'}>
          <Routes key={routeKey}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/home" element={<Navigate replace to="/" />} />
            <Route path="/shop" element={<PageTransition><ShopPage /></PageTransition>} />
            <Route path="/shop/:productId" element={<PageTransition><ProductDetailPage /></PageTransition>} />
            <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
            <Route path="/checkout/success" element={<PageTransition><CheckoutSuccessPage /></PageTransition>} />
            <Route
              path="/tshirts"
              element={<PageTransition><ComingSoonPage title="T-Shirts Collection" /></PageTransition>}
            />
            <Route
              path="/sweaters"
              element={<PageTransition><ComingSoonPage title="Sweaters Collection" /></PageTransition>}
            />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/shipping" element={<PageTransition><ComingSoonPage title="Shipping Info" /></PageTransition>} />
            <Route path="/returns" element={<PageTransition><ComingSoonPage title="Returns Policy" /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
