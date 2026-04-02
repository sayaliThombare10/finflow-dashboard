import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import TopBar from './components/TopBar'
import SummaryCards from './components/SummaryCards'
import BalanceTrendChart from './components/BalanceTrendChart'
import SpendingPieChart from './components/SpendingPieChart'
import MonthlyBarChart from './components/MonthlyBarChart'
import TransactionTable from './components/TransactionTable'
import InsightsGrid from './components/InsightsGrid'

function Dashboard() {
  return (
    <>
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        <div className="lg:col-span-3"><BalanceTrendChart /></div>
        <div className="lg:col-span-2"><SpendingPieChart /></div>
      </div>
    </>
  )
}

function Transactions() {
  return <TransactionTable />
}

function Insights() {
  return (
    <>
      <InsightsGrid />
      <MonthlyBarChart />
    </>
  )
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        {activeTab === 'dashboard'    && <Dashboard />}
        {activeTab === 'transactions' && <Transactions />}
        {activeTab === 'insights'     && <Insights />}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
