export const fmt = (n) =>
  '₹' + Math.abs(n).toLocaleString('en-IN')

export const getStats = (transactions) => {
  const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amt, 0)
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amt, 0)
  return { income, expense, balance: income - expense }
}

export const getMonthlyData = (transactions) => {
  const months = {}
  transactions.forEach(t => {
    const m = t.date.slice(0, 7)
    if (!months[m]) months[m] = { income: 0, expense: 0 }
    if (t.type === 'income') months[m].income += t.amt
    else months[m].expense += t.amt
  })
  return months
}

export const getCategoryTotals = (transactions) => {
  const totals = {}
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => { totals[t.cat] = (totals[t.cat] || 0) + t.amt })
  return totals
}

export const getBalanceTrend = (transactions) => {
  const monthly = getMonthlyData(transactions)
  const keys = Object.keys(monthly).sort()
  let running = 0
  return keys.map(m => {
    running += monthly[m].income - monthly[m].expense
    const [y, mo] = m.split('-')
    const label = new Date(y, mo - 1).toLocaleString('en', { month: 'short', year: '2-digit' })
    return { month: label, balance: running }
  })
}

export const getInsights = (transactions) => {
  const catTotals = getCategoryTotals(transactions)
  const topEntry  = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0]
  const monthly   = getMonthlyData(transactions)
  const keys      = Object.keys(monthly).sort()
  const stats     = getStats(transactions)

  let trend = null
  if (keys.length >= 2) {
    const curr = monthly[keys[keys.length - 1]].expense
    const prev = monthly[keys[keys.length - 2]].expense
    const pct  = prev > 0 ? ((curr - prev) / prev * 100).toFixed(1) : 0
    trend = { pct: parseFloat(pct), curr, prev }
  }

  const savingsRate = stats.income > 0 ? Math.round(stats.balance / stats.income * 100) : 0

  return { topCat: topEntry, trend, savingsRate, stats }
}

export const monthLabel = (key) => {
  const [y, m] = key.split('-')
  return new Date(y, m - 1).toLocaleString('en', { month: 'short' })
}
