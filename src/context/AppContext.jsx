import { createContext, useContext, useState, useEffect } from 'react'
import { INITIAL_TRANSACTIONS } from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('ff_txns')
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS
    } catch {
      return INITIAL_TRANSACTIONS
    }
  })

  const [role, setRole]   = useState('viewer')
  const [dark, setDark]   = useState(false)
  const [nextId, setNextId] = useState(() => {
    try {
      const saved = localStorage.getItem('ff_txns')
      const txns  = saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS
      return Math.max(...txns.map(t => t.id)) + 1
    } catch { return 25 }
  })

  useEffect(() => {
    localStorage.setItem('ff_txns', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const addTransaction = (txn) => {
    setTransactions(prev => [...prev, { ...txn, id: nextId }])
    setNextId(n => n + 1)
  }

  const editTransaction = (id, updates) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  const resetData = () => {
    setTransactions(INITIAL_TRANSACTIONS)
    setNextId(25)
  }

  return (
    <AppContext.Provider value={{
      transactions, role, setRole, dark, setDark,
      addTransaction, editTransaction, deleteTransaction, resetData,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
