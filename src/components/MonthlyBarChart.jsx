import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { useApp } from '../context/AppContext'
import { getMonthlyData, fmt, monthLabel } from '../utils/finance'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 shadow-sm text-sm space-y-1">
      <p className="text-neutral-500 dark:text-neutral-400 text-xs">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="font-mono font-medium" style={{ color: p.fill }}>
          {p.name}: {fmt(p.value)}
        </p>
      ))}
    </div>
  )
}

export default function MonthlyBarChart() {
  const { transactions } = useApp()
  const monthly = getMonthlyData(transactions)
  const data = Object.keys(monthly).sort().map(k => ({
    month: monthLabel(k),
    Income:  monthly[k].income,
    Expense: monthly[k].expense,
  }))

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
      <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">Monthly income vs expenses</h3>
      {data.length === 0 ? (
        <div className="h-52 flex items-center justify-center text-sm text-neutral-400">No data</div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-neutral-100 dark:text-neutral-800" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'currentColor' }} className="text-neutral-400" axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => '₹' + (v >= 100000 ? (v/100000).toFixed(0)+'L' : (v/1000).toFixed(0)+'k')} tick={{ fontSize: 11, fill: 'currentColor' }} className="text-neutral-400" axisLine={false} tickLine={false} width={48} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
              formatter={(val) => <span className="text-neutral-500 dark:text-neutral-400">{val}</span>}
            />
            <Bar dataKey="Income"  fill="#1d9e75" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Expense" fill="#d85a30" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
