import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const TransactionsContext = createContext(null)

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('70x7-transactions')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('70x7-transactions', JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = useCallback((transactionData) => {
    const newTransaction = {
      id: Date.now().toString(),
      ...transactionData,
      status: 'not-reviewed',
      createdAt: new Date().toISOString(),
    }
    setTransactions((current) => [newTransaction, ...current])
    return newTransaction
  }, [])

  const updateTransactionStatus = useCallback((transactionId, status) => {
    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, status, updatedAt: new Date().toISOString() }
          : transaction
      )
    )
  }, [])

  const value = {
    transactions,
    addTransaction,
    updateTransactionStatus,
  }

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider')
  }
  return context
}
