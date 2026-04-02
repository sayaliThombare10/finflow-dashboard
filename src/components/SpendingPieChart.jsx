import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../context/AppContext'
import { getCategoryTotals, fmt } from '../utils/finance'
import { CATEGORY_COLORS } from '../data/mockData'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 shadow-sm text-sm">
      <p className="text-neutral-500 dark:text-neutral-400 text-xs">{d.name}</p>
      <p className="font-mono font-medium" style={{ color: d.payload.fill }}>{fmt(d.value)}</p>
    </div>
  )
}

export default function SpendingPieChart() {
  const { transactions } = useApp()
  const totals = getCategoryTotals(transactions)
  const total  = Object.values(totals).reduce((s, v) => s + v, 0)

  const data = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, value]) => ({ name: cat, value, fill: CATEGORY_COLORS[cat] || '#888780' }))

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
      <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">Spending breakdown</h3>

      {data.length === 0 ? (
        <div className="h-44 flex items-center justify-center text-sm text-neutral-400">No expense data</div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="mt-2 space-y-1.5">
            {data.slice(0, 5).map(d => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: d.fill }} />
                <span className="text-neutral-600 dark:text-neutral-400 flex-1">{d.name}</span>
                <span className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                  {Math.round(d.value / total * 100)}%
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
