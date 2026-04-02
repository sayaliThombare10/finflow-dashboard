import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import { useApp } from '../context/AppContext'
import { getBalanceTrend, fmt } from '../utils/finance'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 shadow-sm text-sm">
      <p className="text-neutral-500 dark:text-neutral-400 text-xs mb-1">{label}</p>
      <p className="font-mono font-medium text-emerald-600 dark:text-emerald-400">{fmt(payload[0].value)}</p>
    </div>
  )
}

export default function BalanceTrendChart() {
  const { transactions } = useApp()
  const data = getBalanceTrend(transactions)

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
      <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">Balance trend</h3>
      {data.length === 0 ? (
        <div className="h-44 flex items-center justify-center text-sm text-neutral-400">No data</div>
      ) : (
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>

            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-neutral-100 dark:text-neutral-800" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: 'currentColor' }}
              className="text-neutral-400 dark:text-neutral-500"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={v => '₹' + (v >= 100000 ? (v/100000).toFixed(1)+'L' : (v/1000).toFixed(0)+'k')}
              tick={{ fontSize: 11, fill: 'currentColor' }}
              className="text-neutral-400 dark:text-neutral-500"
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#1d9e75"
              strokeWidth={2}
              dot={{ r: 4, fill: '#1d9e75', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#1d9e75', strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
