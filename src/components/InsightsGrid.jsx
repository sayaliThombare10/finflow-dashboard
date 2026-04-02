import { TrendingUp, TrendingDown, Flame, PiggyBank, BarChart3 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getInsights, fmt } from '../utils/finance'
import { CATEGORY_COLORS } from '../data/mockData'

export default function InsightsGrid() {
  const { transactions } = useApp()
  const { topCat, trend, savingsRate, stats } = getInsights(transactions)

  const cards = [
    {
      icon: <Flame size={16} className="text-red-400" />,
      label: 'Highest spending',
      value: topCat ? topCat[0] : '—',
      sub: topCat ? `${fmt(topCat[1])} total` : 'No expense data',
      accent: topCat ? CATEGORY_COLORS[topCat[0]] : '#888780',
    },
    {
      icon: trend?.pct > 0
        ? <TrendingUp size={16} className="text-red-400" />
        : <TrendingDown size={16} className="text-emerald-500" />,
      label: 'Expense trend',
      value: trend ? `${trend.pct > 0 ? '▲' : '▼'} ${Math.abs(trend.pct)}%` : '—',
      sub: trend ? 'vs previous month' : 'Not enough data',
      valueColor: !trend ? '' : trend.pct > 0 ? 'text-red-500 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: <PiggyBank size={16} className="text-emerald-500" />,
      label: 'Savings rate',
      value: `${savingsRate}%`,
      sub: `${fmt(stats.balance)} saved`,
      valueColor: savingsRate >= 20 ? 'text-emerald-600 dark:text-emerald-400' : savingsRate >= 0 ? 'text-amber-600 dark:text-amber-400' : 'text-red-500',
    },
    {
      icon: <BarChart3 size={16} className="text-blue-400" />,
      label: 'Total expenses',
      value: fmt(stats.expense),
      sub: `${transactions.filter(t => t.type === 'expense').length} expense entries`,
      valueColor: 'text-red-500 dark:text-red-400',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
      {cards.map((c, i) => (
        <div key={i} className="card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{c.label}</span>
            {c.icon}
          </div>
          <div
            className={`text-xl font-mono font-medium tracking-tight ${c.valueColor || 'text-neutral-800 dark:text-neutral-200'}`}
            style={c.accent ? { color: c.accent } : {}}
          >
            {c.value}
          </div>
          <div className="text-xs mt-1 text-neutral-400 dark:text-neutral-500">{c.sub}</div>
        </div>
      ))}
    </div>
  )
}
