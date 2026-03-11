import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
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

function App() {
  return (
    <CartProvider>
      <div className="site-shell">
        <ScrollToTop />
        <Header />
        <main className="brand-page">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate replace to="/" />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/tshirts"
              element={<ComingSoonPage title="T-Shirts Collection" />}
            />
            <Route
              path="/sweaters"
              element={<ComingSoonPage title="Sweaters Collection" />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/shipping" element={<ComingSoonPage title="Shipping Info" />} />
            <Route path="/returns" element={<ComingSoonPage title="Returns Policy" />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
