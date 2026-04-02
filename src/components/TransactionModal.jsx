import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATEGORIES, CATEGORY_COLORS } from '../data/mockData'

const empty = { desc: '', amt: '', type: 'expense', cat: 'Food', date: '' }

export default function TransactionModal({ open, onClose, editData }) {
  const { addTransaction, editTransaction } = useApp()
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editData) {
      setForm({ desc: editData.desc, amt: String(editData.amt), type: editData.type, cat: editData.cat, date: editData.date })
    } else {
      setForm({ ...empty, date: new Date().toISOString().slice(0, 10) })
    }
    setError('')
  }, [editData, open])

  if (!open) return null

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    if (!form.desc.trim()) return setError('Description is required.')
    if (!form.amt || isNaN(parseFloat(form.amt)) || parseFloat(form.amt) <= 0) return setError('Enter a valid amount.')
    if (!form.date) return setError('Date is required.')

    const payload = { desc: form.desc.trim(), amt: parseFloat(form.amt), type: form.type, cat: form.cat, date: form.date }
    if (editData) editTransaction(editData.id, payload)
    else addTransaction(payload)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">
          <h2 className="text-base font-medium text-neutral-900 dark:text-white">
            {editData ? 'Edit transaction' : 'Add transaction'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div className="px-5 py-4 space-y-4">
          {error && (
            <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div>
            <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Description</label>
            <input
              className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-colors input input-bordered input-sm w-full max-w-xs"
              placeholder="e.g. Grocery shopping"
              value={form.desc}
              onChange={e => set('desc', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Amount (₹)</label>
              <input
                type="number"
                min="0"
                className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-colors font-mono"
                placeholder="0"
                value={form.amt}
                onChange={e => set('amt', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Type</label>
              <select
                className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-colors"
                value={form.type}
                onChange={e => set('type', e.target.value)}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Category</label>
              <select
                className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-colors"
                value={form.cat}
                onChange={e => set('cat', e.target.value)}
              >
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-colors"
                value={form.date}
                onChange={e => set('date', e.target.value)}
              />
            </div>
          </div>

          {/* Category preview dot */}
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: CATEGORY_COLORS[form.cat] || '#888780' }} />
            <span>{form.cat} · {form.type}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 justify-end px-5 py-3 border-t border-neutral-100 dark:border-neutral-800">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 rounded-lg transition-opacity">
            {editData ? 'Save changes' : 'Add transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}
