import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import {
  accountPipeline,
  activityFeed,
  channelSplit,
  goalsProgress,
  productPerformance,
  revenueTrend,
} from '../../data/mockData'

export type TimeRange = '3m' | '6m' | '12m'
export type AccountStatusFilter = 'all' | 'on-track' | 'at-risk' | 'blocked'

interface DashboardFilters {
  searchTerm: string
  status: AccountStatusFilter
  timeRange: TimeRange
}

interface DashboardState {
  filters: DashboardFilters
}

const initialState: DashboardState = {
  filters: {
    searchTerm: '',
    status: 'all',
    timeRange: '6m',
  },
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<AccountStatusFilter>) => {
      state.filters.status = action.payload
    },
    setTimeRange: (state, action: PayloadAction<TimeRange>) => {
      state.filters.timeRange = action.payload
    },
    resetFilters: (state) => {
      state.filters = { ...initialState.filters }
    },
  },
})

export const { setSearchTerm, setStatusFilter, setTimeRange, resetFilters } = dashboardSlice.actions

export const selectDashboardFilters = (state: RootState) => state.dashboard.filters

const monthsByRange: Record<TimeRange, number> = {
  '3m': 3,
  '6m': 6,
  '12m': 12,
}

export const selectRevenueSeries = createSelector(
  [(state: RootState) => state.dashboard.filters.timeRange],
  (timeRange) => {
    const months = monthsByRange[timeRange]
    return revenueTrend.slice(-months)
  },
)

export const selectActiveAccounts = createSelector(
  [(state: RootState) => state.dashboard.filters],
  (filters) => {
    const normalizedSearch = filters.searchTerm.trim().toLowerCase()

    return accountPipeline.filter((account) => {
      const matchesStatus = filters.status === 'all' || account.status === filters.status
      const matchesSearch =
        !normalizedSearch ||
        account.company.toLowerCase().includes(normalizedSearch) ||
        account.owner.toLowerCase().includes(normalizedSearch)

      return matchesStatus && matchesSearch
    })
  },
)

export const selectAccountSummary = createSelector([selectActiveAccounts], (accounts) => {
  const totalMrr = accounts.reduce((sum, account) => sum + account.mrr, 0)
  const avgChange =
    accounts.length === 0
      ? 0
      : accounts.reduce((sum, account) => sum + account.change, 0) / accounts.length

  const statusTally = accounts.reduce(
    (acc, account) => {
      acc[account.status] += 1
      return acc
    },
    { 'on-track': 0, 'at-risk': 0, blocked: 0 },
  )

  return {
    totalMrr,
    avgChange,
    statusTally,
  }
})

export const selectProductPerformance = createSelector(
  [(state: RootState) => state.dashboard.filters.timeRange],
  () => productPerformance,
)
export const selectChannelSplit = createSelector(
  [(state: RootState) => state.dashboard.filters.timeRange],
  () => channelSplit,
)
export const selectActivityFeed = createSelector(
  [(state: RootState) => state.dashboard.filters.timeRange],
  () => activityFeed,
)
export const selectGoalProgress = createSelector(
  [(state: RootState) => state.dashboard.filters.timeRange],
  () => goalsProgress,
)

export const selectHeadlineMetrics = createSelector([selectRevenueSeries], (series) => {
  if (series.length === 0) {
    return {
      revenue: 0,
      expenses: 0,
      newCustomers: 0,
      revenueGrowth: 0,
      expenseGrowth: 0,
      customerGrowth: 0,
    }
  }

  const latest = series[series.length - 1]
  const previous = series[series.length - 2] ?? latest

  const revenueGrowth = previous.revenue === 0 ? 0 : ((latest.revenue - previous.revenue) / previous.revenue) * 100
  const expenseGrowth = previous.expenses === 0 ? 0 : ((latest.expenses - previous.expenses) / previous.expenses) * 100
  const customerGrowth =
    previous.newCustomers === 0
      ? 0
      : ((latest.newCustomers - previous.newCustomers) / previous.newCustomers) * 100

  return {
    revenue: latest.revenue,
    expenses: latest.expenses,
    newCustomers: latest.newCustomers,
    revenueGrowth,
    expenseGrowth,
    customerGrowth,
  }
})

export default dashboardSlice.reducer
