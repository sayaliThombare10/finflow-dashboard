import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { fmt, getStats } from '../utils/finance'
import { useApp } from '../context/AppContext'

export default function SummaryCards() {
  const { transactions } = useApp()
  const { income, expense, balance } = getStats(transactions)

  const cards = [
    {
      label: 'Total balance',
      value: fmt(balance),
      sign: balance >= 0 ? '+' : '',
      color: balance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500',
      bg: 'bg-white dark:bg-neutral-900',
      icon: <Wallet size={16} className="text-neutral-400" />,
      sub: balance >= 0 ? '▲ Positive cashflow' : '▼ Negative cashflow',
      subColor: balance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500',
    },
    {
      label: 'Total income',
      value: fmt(income),
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-white dark:bg-neutral-900',
      icon: <TrendingUp size={16} className="text-emerald-500" />,
      sub: `${transactions.filter(t => t.type === 'income').length} transactions`,
      subColor: 'text-neutral-400 dark:text-neutral-500',
    },
    {
      label: 'Total expenses',
      value: fmt(expense),
      color: 'text-red-500 dark:text-red-400',
      bg: 'bg-white dark:bg-neutral-900',
      icon: <TrendingDown size={16} className="text-red-400" />,
      sub: `${transactions.filter(t => t.type === 'expense').length} transactions`,
      subColor: 'text-neutral-400 dark:text-neutral-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
      {cards.map((c) => (
        <div key={c.label} className={`card ${c.bg} border border-neutral-200 dark:border-neutral-800 rounded-xl p-4`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              {c.label}
            </span>
            {c.icon}
          </div>
          <div className={`text-2xl font-mono font-medium tracking-tight ${c.color}`}>
            {c.value}
          </div>
          <div className={`text-xs mt-1.5 font-medium ${c.subColor}`}>{c.sub}</div>
        </div>
      ))}
    </div>
  )
}
