import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/AdminLoginPage.css'

const ADMIN_EMAIL = 'admin@gmail.com'
const ADMIN_PASSWORD = 'admin123'

function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin-auth', 'true')
        navigate('/admin/dashboard')
      } else {
        setError('Invalid email or password')
      }
      setLoading(false)
    }, 300)
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1 className="admin-login__title">Admin Portal</h1>
        <p className="admin-login__subtitle">Sign in to manage orders</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              disabled={loading}
              required
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={loading}
              required
            />
          </div>

          {error && <div className="admin-login__error">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary admin-login__submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage
