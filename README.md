# FinFlow — Finance Dashboard UI

A clean, interactive finance dashboard built with **React**, **Tailwind CSS**, and **Recharts/Chart.js**. Built as part of the Zorvyn Frontend Developer Intern assignment.

---

## Live Demo

> Deploy via Vercel/Netlify after cloning — see setup instructions below.

---

## Overview

FinFlow lets users track and understand their financial activity through an intuitive, role-aware interface. It covers a full dashboard overview, a searchable transactions section, spending insights, and role-based UI behavior — all powered by mock/static data with localStorage persistence.

---

## Features

### Dashboard Overview
- **Summary cards** — Total Balance, Total Income, Total Expenses with trend indicators
- **Balance trend chart** — Line chart showing cumulative balance over months
- **Spending breakdown** — Doughnut chart with category legend and percentage split

### Transactions Section
- Full transaction table with Date, Description, Category, Type, and Amount
- **Search** by description or category (live filter)
- **Filter** by transaction type: All / Income / Expense
- **Sort** by date (newest/oldest) or amount (high/low)
- Empty state handling when no results match

### Role-Based UI (Frontend simulation)
- Toggle between **Viewer** and **Admin** roles via a button in the top bar
- **Viewer** — read-only access to all data and charts
- **Admin** — unlocks:
  - Add new transaction (modal form with validation)
  - Edit existing transactions
  - Delete transactions

### Insights Section
- **Highest spending category** with total amount
- **Month-over-month expense comparison** (percentage change vs previous month)
- **Savings rate** — percentage of income saved
- **Monthly bar chart** — grouped income vs expense by month

### State Management
- React `useState` for all UI state: transactions, filters, search query, active role, dark mode, modal open/edit state
- No external state library needed — state is well-scoped and lifted appropriately
- `localStorage` persistence so data survives page refreshes

### UI / UX
- Clean, minimal design with consistent spacing and typography (`DM Sans` + `DM Mono`)
- **Responsive layout** — works on mobile, tablet, and desktop
- **Dark mode** toggle (persists visually for the session)
- Smooth transitions on interactive elements
- Category color-coded pills and badges throughout

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS |
| Charts | Chart.js 4 via CDN |
| Persistence | localStorage |
| State | React useState |
| Fonts | Google Fonts (DM Sans, DM Mono) |

---

## Project Structure

```
finflow/
├── public/
├── src/
│   ├── components/
│   │   ├── TopBar.jsx          # Navigation, role switcher, dark mode toggle
│   │   ├── SummaryCards.jsx    # Balance / Income / Expense cards
│   │   ├── LineChart.jsx       # Balance trend chart (Chart.js)
│   │   ├── PieChart.jsx        # Spending breakdown doughnut chart
│   │   ├── BarChart.jsx        # Monthly income vs expense comparison
│   │   ├── TransactionTable.jsx # Table with search, filter, sort
│   │   ├── TransactionModal.jsx # Add / Edit modal form
│   │   └── InsightsGrid.jsx    # Insight cards section
│   ├── context/
│   │   └── AppContext.jsx      # Global state: transactions, role, dark mode
│   ├── data/
│   │   └── mockData.js         # Static mock transactions (24 entries, Jan–Mar 2024)
│   ├── utils/
│   │   └── finance.js          # Helper functions: totals, category grouping, monthly stats
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/finflow-dashboard.git
cd finflow-dashboard

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview
```

---

## Mock Data

The app ships with 24 pre-loaded transactions covering January–March 2024, including:

- Monthly salary and freelance income
- Housing (rent, electricity)
- Food, transport, shopping, health, entertainment
- SIP investment and dividend income

Data is seeded from `src/data/mockData.js` and stored in `localStorage` on first load. Subsequent visits use the persisted version, so any transactions added in Admin mode are retained.

To reset to mock data, clear `localStorage` key `ff_txns` in browser DevTools.

---

## Role Switching

The role switcher is in the top-right corner of the navigation bar.

| Feature | Viewer | Admin |
|---|---|---|
| View dashboard | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| Search / filter / sort | ✅ | ✅ |
| View insights | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit transaction | ❌ | ✅ |
| Delete transaction | ❌ | ✅ |

No authentication is involved — this is a frontend-only simulation for demonstration.

---

## Design Decisions

- **DM Mono for numbers** — financial figures use a monospaced font so digits align cleanly and scan quickly.
- **Category color system** — each spending category has a consistent hex color used across the pie chart, table pills, and insight cards.
- **Tab-based navigation** — Overview, Transactions, and Insights are separated into tabs rather than a long scrolling page, reducing cognitive load on each view.
- **Chart.js over Recharts** — chosen for its lightweight CDN usage and flexibility in configuring axes, tooltips, and legends.
- **No Redux/Zustand** — the state surface is small enough that `useState` with prop drilling handles it cleanly. Context is used only for role and dark mode which are truly global.

---

## Optional Enhancements Implemented

- Dark mode toggle (full UI inversion including charts)
- localStorage persistence
- Smooth CSS transitions on buttons, rows, and modal
- Empty state UI when search/filter returns no results

---

## Assumptions Made

- Currency is Indian Rupees (₹) — consistent with the Mumbai context.
- "Monthly comparison" in insights compares the most recent two months of expense data.
- Transactions with `type: income` are excluded from the spending breakdown pie chart.
- The assignment does not require authentication — role switching is purely presentational.

---

## Author

**Sayali Thombare**
Frontend Developer Intern Assignment — Zorvyn FinTech Pvt. Ltd.
Submitted: April 2026
