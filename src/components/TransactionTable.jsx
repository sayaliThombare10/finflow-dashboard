import { useState } from 'react'
import { Search, ArrowUpDown, Pencil, Trash2, Plus } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { fmt } from '../utils/finance'
import { CATEGORY_COLORS } from '../data/mockData'
import TransactionModal from './TransactionModal'

export default function TransactionTable() {
  const { transactions, deleteTransaction, role } = useApp()
  const isAdmin = role === 'admin'

  const [search,  setSearch]  = useState('')
  const [typeF,   setTypeF]   = useState('all')
  const [sort,    setSort]    = useState('date-desc')
  const [modal,   setModal]   = useState(false)
  const [editTxn, setEditTxn] = useState(null)

  const openAdd  = ()   => { setEditTxn(null); setModal(true) }
  const openEdit = (t)  => { setEditTxn(t);    setModal(true) }
  const closeModal = () => { setModal(false);   setEditTxn(null) }

  const handleDelete = (id) => {
    if (confirm('Delete this transaction?')) deleteTransaction(id)
  }

  let rows = transactions.filter(t => {
    const q = search.toLowerCase()
    if (q && !t.desc.toLowerCase().includes(q) && !t.cat.toLowerCase().includes(q)) return false
    if (typeF !== 'all' && t.type !== typeF) return false
    return true
  })

  if (sort === 'date-desc') rows.sort((a, b) => b.date.localeCompare(a.date))
  else if (sort === 'date-asc') rows.sort((a, b) => a.date.localeCompare(b.date))
  else if (sort === 'amt-desc') rows.sort((a, b) => b.amt - a.amt)
  else rows.sort((a, b) => a.amt - b.amt)

  return (
    <>
      <TransactionModal open={modal} onClose={closeModal} editData={editTxn} />

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
        {/* Controls */}
        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2 flex-1">
            {/* Search */}
            <div className="relative flex-1 min-w-[160px] max-w-xs">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                className="w-full pl-8 pr-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-colors"
                placeholder="Search transactions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Type filter */}
            <select
              className="px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
              value={typeF}
              onChange={e => setTypeF(e.target.value)}
            >
              <option value="all">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {/* Sort */}
            <select
              className="px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="date-desc">Date (newest)</option>
              <option value="date-asc">Date (oldest)</option>
              <option value="amt-desc">Amount (high)</option>
              <option value="amt-asc">Amount (low)</option>
            </select>
          </div>

          {isAdmin && (
            <button
              onClick={openAdd}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-opacity shrink-0"
            >
              <Plus size={14} />
              Add
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {rows.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-3xl mb-2">🔍</div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">No transactions found</p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide">Date</th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide">Description</th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide hidden sm:table-cell">Category</th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide hidden md:table-cell">Type</th>
                  <th className="text-right px-4 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide">Amount</th>
                  {isAdmin && <th className="px-4 py-2.5" />}
                </tr>
              </thead>
              <tbody>
                {rows.map(t => (
                  <tr key={t.id} className="border-b border-neutral-50 dark:border-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors group">
                    <td className="px-4 py-3 font-mono text-xs text-neutral-400 dark:text-neutral-500 whitespace-nowrap">{t.date}</td>
                    <td className="px-4 py-3 font-medium text-neutral-800 dark:text-neutral-200">{t.desc}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          background: (CATEGORY_COLORS[t.cat] || '#888780') + '22',
                          color: CATEGORY_COLORS[t.cat] || '#888780',
                        }}
                      >
                        {t.cat}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide ${
                        t.type === 'income'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      }`}>
                        {t.type}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-right font-mono font-medium whitespace-nowrap ${
                      t.type === 'income'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-500 dark:text-red-400'
                    }`}>
                      {t.type === 'income' ? '+' : '-'}{fmt(t.amt)}
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEdit(t)} className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors">
                            <Pencil size={12} />
                          </button>
                          <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-400 hover:text-red-500 transition-colors">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer count */}
        {rows.length > 0 && (
          <div className="px-4 py-2.5 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400">
            {rows.length} of {transactions.length} transactions
          </div>
        )}
      </div>
    </>
  )
}
