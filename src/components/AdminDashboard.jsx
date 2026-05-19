import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTransactions } from '../context/TransactionsContext'
import '../styles/AdminDashboard.css'

const STATUS_OPTIONS = [
  { value: 'not-reviewed', label: 'Not Yet Reviewed', color: '#999' },
  { value: 'in-progress', label: 'In Progress', color: '#ff9800' },
  { value: 'shipped', label: 'Shipped', color: '#2196f3' },
  { value: 'completed', label: 'Completed', color: '#4caf50' },
]

function AdminDashboard() {
  const navigate = useNavigate()
  const { transactions, updateTransactionStatus } = useTransactions()
  const [filter, setFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('admin-auth')
    if (!isAuthenticated) {
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem('admin-auth')
    navigate('/admin/login')
  }

  const handleStatusChange = (transactionId, newStatus) => {
    updateTransactionStatus(transactionId, newStatus)
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === 'all' || transaction.status === filter
    const matchesSearch =
      transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customerAddress.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status) => {
    const option = STATUS_OPTIONS.find((opt) => opt.value === status)
    return option?.color || '#999'
  }

  const getStatusLabel = (status) => {
    const option = STATUS_OPTIONS.find((opt) => opt.value === status)
    return option?.label || status
  }

  const stats = {
    total: transactions.length,
    notReviewed: transactions.filter((t) => t.status === 'not-reviewed').length,
    inProgress: transactions.filter((t) => t.status === 'in-progress').length,
    shipped: transactions.filter((t) => t.status === 'shipped').length,
    completed: transactions.filter((t) => t.status === 'completed').length,
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header__content">
          <h1>Order Management Dashboard</h1>
          <button onClick={handleLogout} className="btn btn-secondary admin-logout">
            Logout
          </button>
        </div>
      </header>

      <main className="admin-main">
        <section className="admin-stats">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-card stat-card--warning">
            <div className="stat-number">{stats.notReviewed}</div>
            <div className="stat-label">Not Yet Reviewed</div>
          </div>
          <div className="stat-card stat-card--info">
            <div className="stat-number">{stats.inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card stat-card--primary">
            <div className="stat-number">{stats.shipped}</div>
            <div className="stat-label">Shipped</div>
          </div>
          <div className="stat-card stat-card--success">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </section>

        <section className="admin-filters">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search by customer name, email, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search"
            />
          </div>

          <div className="filter-buttons">
            <button
              onClick={() => setFilter('all')}
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            >
              All Orders
            </button>
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status.value}
                onClick={() => setFilter(status.value)}
                className={`filter-btn ${filter === status.value ? 'active' : ''}`}
                style={{
                  borderColor: getStatusColor(status.value),
                }}
              >
                {status.label}
              </button>
            ))}
          </div>
        </section>

        <section className="admin-transactions">
          {filteredTransactions.length === 0 ? (
            <div className="no-transactions">
              <p>No orders found</p>
            </div>
          ) : (
            <div className="transactions-list">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="transaction-card"
                  style={{
                    borderLeftColor: getStatusColor(transaction.status),
                  }}
                >
                  <div className="transaction-header">
                    <div className="transaction-info">
                      <h3>{transaction.customerName}</h3>
                      <p className="transaction-email">{transaction.customerEmail}</p>
                      <p className="transaction-date">
                        {new Date(transaction.createdAt).toLocaleDateString()} at{' '}
                        {new Date(transaction.createdAt).toLocaleTimeString()}
                      </p>
                    </div>

                    <div className="transaction-status">
                      <select
                        value={transaction.status}
                        onChange={(e) =>
                          handleStatusChange(transaction.id, e.target.value)
                        }
                        className="status-select"
                        style={{
                          color: getStatusColor(transaction.status),
                        }}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="expand-btn"
                      onClick={() =>
                        setExpandedId(
                          expandedId === transaction.id ? null : transaction.id
                        )
                      }
                    >
                      {expandedId === transaction.id ? '−' : '+'}
                    </button>
                  </div>

                  {expandedId === transaction.id && (
                    <div className="transaction-details">
                      <div className="details-section">
                        <h4>Shipping Address</h4>
                        <p>{transaction.customerAddress}</p>
                        {transaction.customerApartment && (
                          <p className="details-section__sub">{transaction.customerApartment}</p>
                        )}
                        <p>
                          {transaction.customerCity}, {transaction.customerProvince}{' '}
                          {transaction.customerPostalCode}
                        </p>
                      </div>

                      <div className="details-section">
                        <h4>Items Purchased</h4>
                        <div className="items-list">
                          {transaction.items.map((item) => (
                            <div key={item.id} className="item-row">
                              <span>{item.name}</span>
                              <span className="quantity">× {item.quantity}</span>
                              <span className="price">${item.itemPrice}</span>
                            </div>
                          ))}
                        </div>
                        <div className="items-total">
                          <strong>Subtotal:</strong>
                          <strong>${transaction.subtotal.toFixed(2)}</strong>
                        </div>
                        {transaction.shippingCost && (
                          <div className="items-total">
                            <strong>Shipping:</strong>
                            <strong>${transaction.shippingCost.toFixed(2)}</strong>
                          </div>
                        )}
                        <div className="items-total items-total--grand">
                          <strong>Total:</strong>
                          <strong>
                            ${(
                              transaction.subtotal +
                              (transaction.shippingCost || 0)
                            ).toFixed(2)}
                          </strong>
                        </div>
                      </div>

                      {transaction.deliveryInstructions && (
                        <div className="details-section">
                          <h4>Delivery Instructions</h4>
                          <p>{transaction.deliveryInstructions}</p>
                        </div>
                      )}

                      {transaction.shippingMethod && (
                        <div className="details-section">
                          <h4>Shipping Method</h4>
                          <p>{transaction.shippingMethod}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default AdminDashboard
