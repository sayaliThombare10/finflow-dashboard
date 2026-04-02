import { Sun, Moon, ShieldCheck, Eye } from 'lucide-react'
import { useApp } from '../context/AppContext'

const TABS = [
  { id: 'dashboard',    label: 'Overview' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'insights',     label: 'Insights' },
]

export default function TopBar({ activeTab, setActiveTab }) {
  const { role, setRole, dark, setDark } = useApp()
  const isAdmin = role === 'admin'

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 gap-3">

        {/* Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-base font-semibold tracking-tight text-neutral-900 dark:text-white">
            fin<span className="text-emerald-600 dark:text-emerald-400">flow</span>
          </span>

          {/* Nav tabs — hidden on small screens */}
          <nav className="hidden sm:flex gap-1">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === t.id
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Role badge */}
          <span className={`hidden sm:inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            isAdmin
              ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
              : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
          }`}>
            {isAdmin ? <ShieldCheck size={12} /> : <Eye size={12} />}
            {isAdmin ? 'Admin' : 'Viewer'}
          </span>

          <button
            onClick={() => setRole(r => r === 'viewer' ? 'admin' : 'viewer')}
            className="text-xs px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium"
          >
            {isAdmin ? 'Viewer mode' : 'Admin mode'}
          </button>

          <button
            onClick={() => setDark(d => !d)}
            className="p-1.5 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden flex border-t border-neutral-100 dark:border-neutral-800">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-1 py-2 text-xs font-medium transition-colors ${
              activeTab === t.id
                ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </header>
  )
}
