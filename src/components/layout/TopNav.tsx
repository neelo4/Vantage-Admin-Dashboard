import type { ChangeEvent } from 'react'
import { Menu, Search } from 'lucide-react'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectCurrentUser, selectUsers, switchUser } from '../../features/auth/authSlice'
import {
  selectDashboardFilters,
  setSearchTerm,
  setTimeRange,
  type TimeRange,
} from '../../features/dashboard/dashboardSlice'

interface TopNavProps {
  onOpenSidebar: () => void
}

const timeRanges: { label: string; value: TimeRange }[] = [
  { label: '3M', value: '3m' },
  { label: '6M', value: '6m' },
  { label: '12M', value: '12m' },
]

const TopNav = ({ onOpenSidebar }: TopNavProps) => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectDashboardFilters)
  const currentUser = useAppSelector(selectCurrentUser)
  const users = useAppSelector(selectUsers)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value))
  }

  const handleTimeRange = (value: TimeRange) => {
    dispatch(setTimeRange(value))
  }

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(switchUser(event.target.value))
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-3 sm:flex-row sm:items-center sm:gap-6 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="text-left">
            <p className="text-xs uppercase tracking-wide text-slate-400">Currently Viewing</p>
            <h1 className="text-lg font-semibold text-slate-900">Strategic Revenue Workspace</h1>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-end">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="Search accounts, owners, or notes"
              value={filters.searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="flex items-center rounded-full bg-slate-100 p-1 text-xs font-medium text-slate-500">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleTimeRange(range.value)}
                  className={clsx(
                    'rounded-full px-3 py-1.5 transition',
                    filters.timeRange === range.value
                      ? 'bg-white text-brand-600 shadow'
                      : 'hover:text-slate-700',
                  )}
                  type="button"
                >
                  {range.label}
                </button>
              ))}
            </div>

            <label className="inline-flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 sm:w-auto">
              <span className="hidden sm:inline">Role:</span>
              <select
                value={currentUser.id}
                onChange={handleUserChange}
                className="w-full bg-transparent text-sm font-medium text-slate-700 focus:outline-none"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} · {user.role.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNav
