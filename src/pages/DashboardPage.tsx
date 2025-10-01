import { Download, PiggyBank, TrendingUp, Users } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import AccountTable from '../components/dashboard/AccountTable'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import GoalProgressList from '../components/dashboard/GoalProgressList'
import MetricCard from '../components/dashboard/MetricCard'
import ChannelDonutChart from '../components/charts/ChannelDonutChart'
import ProductBarChart from '../components/charts/ProductBarChart'
import RevenueAreaChart from '../components/charts/RevenueAreaChart'
import Card from '../components/ui/Card'
import {
  resetFilters,
  selectAccountSummary,
  selectActiveAccounts,
  selectActivityFeed,
  selectChannelSplit,
  selectDashboardFilters,
  selectGoalProgress,
  selectHeadlineMetrics,
  selectProductPerformance,
  selectRevenueSeries,
  setStatusFilter,
  type AccountStatusFilter,
} from '../features/dashboard/dashboardSlice'

const statusFilters: { label: string; value: AccountStatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'On Track', value: 'on-track' },
  { label: 'At Risk', value: 'at-risk' },
  { label: 'Blocked', value: 'blocked' },
]

const DashboardPage = () => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectDashboardFilters)
  const headline = useAppSelector(selectHeadlineMetrics)
  const revenueSeries = useAppSelector(selectRevenueSeries)
  const products = useAppSelector(selectProductPerformance)
  const channels = useAppSelector(selectChannelSplit)
  const accounts = useAppSelector(selectActiveAccounts)
  const summary = useAppSelector(selectAccountSummary)
  const activity = useAppSelector(selectActivityFeed)
  const goals = useAppSelector(selectGoalProgress)

  const currency = useMemo(
    () => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
    [],
  )

  const peopleFormatter = useMemo(() => new Intl.NumberFormat('en-US'), [])

  const handleExport = useCallback(() => {
    const generatedAt = new Date()
    const formatDelta = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
    const escapeCsv = (value: string | number) => {
      const stringValue = String(value)
      const newlineChar = String.fromCharCode(10)
      const carriageReturnChar = String.fromCharCode(13)
      const needsQuotes =
        stringValue.includes('"') ||
        stringValue.includes(',') ||
        stringValue.includes(newlineChar) ||
        stringValue.includes(carriageReturnChar)
      if (needsQuotes) {
        return `"${stringValue.replace(/"/g, '""')}"`
      }
      return stringValue
    }
    const lines: string[] = []
    const pushRow = (...columns: (string | number)[]) => {
      lines.push(columns.map(escapeCsv).join(','))
    }

    pushRow('Revenue Intelligence Dashboard Export')
    pushRow('Generated At', generatedAt.toISOString())
    pushRow(
      'Filters',
      `Status: ${filters.status}`,
      `Time Range: ${filters.timeRange.toUpperCase()}`,
      `Search: ${filters.searchTerm.trim() || '—'}`
    )
    lines.push('')

    lines.push('Headline Metrics')
    pushRow('Metric', 'Value', 'Delta')
    pushRow('Recurring revenue', currency.format(headline.revenue), formatDelta(headline.revenueGrowth))
    pushRow('Operating expenses', currency.format(headline.expenses), formatDelta(headline.expenseGrowth))
    pushRow('New customers', peopleFormatter.format(headline.newCustomers), formatDelta(headline.customerGrowth))
    pushRow(
      'Portfolio health',
      `${summary.statusTally['on-track']} / ${accounts.length}`,
      formatDelta(summary.avgChange)
    )
    lines.push('')

    lines.push('Accounts')
    pushRow('Account', 'Owner', 'Industry', 'Status', 'MRR', 'Change %', 'Last Touch (UTC)')
    if (accounts.length === 0) {
      pushRow('No accounts matched your filters')
    } else {
      accounts.forEach((account) => {
        pushRow(
          account.company,
          account.owner,
          account.industry,
          account.status,
          currency.format(account.mrr),
          `${account.change >= 0 ? '+' : ''}${account.change.toFixed(1)}%`,
          new Date(account.lastTouch).toISOString()
        )
      })
    }

    lines.push('')
    lines.push('Status Breakdown')
    pushRow('Status', 'Count')
    Object.entries(summary.statusTally).forEach(([status, count]) => {
      pushRow(status, count)
    })

    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const fileName = `revenue-dashboard-export-${generatedAt.toISOString()}.csv`
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [accounts, currency, filters.searchTerm, filters.status, filters.timeRange, headline, peopleFormatter, summary])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Revenue intelligence dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Monitor revenue, customer health, and go-to-market execution in one workspace. Use filters to personalise the
            data for your teams.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-brand-600"
        >
          <Download className="h-4 w-4" /> Export executive summary
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        {statusFilters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => dispatch(setStatusFilter(item.value))}
            className={
              filters.status === item.value
                ? 'rounded-full bg-brand-600 px-4 py-2 font-semibold text-white shadow'
                : 'rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-500 hover:border-brand-200 hover:text-brand-600'
            }
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => dispatch(resetFilters())}
          className="rounded-full border border-transparent px-4 py-2 font-medium text-slate-400 transition hover:text-slate-600"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Recurring revenue"
          value={currency.format(headline.revenue)}
          secondary="Latest month, auto-refreshed"
          delta={headline.revenueGrowth}
          trend={headline.revenueGrowth >= 0 ? 'up' : 'down'}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          label="Operating expenses"
          value={currency.format(headline.expenses)}
          secondary="Run-rate across all teams"
          delta={headline.expenseGrowth}
          trend={headline.expenseGrowth <= 0 ? 'up' : 'down'}
          icon={<PiggyBank className="h-5 w-5" />}
        />
        <MetricCard
          label="New customers"
          value={peopleFormatter.format(headline.newCustomers)}
          secondary="Net-new accounts added"
          delta={headline.customerGrowth}
          trend={headline.customerGrowth >= 0 ? 'up' : 'down'}
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          label="Portfolio health"
          value={`${summary.statusTally['on-track']} / ${accounts.length}`}
          secondary="Accounts meeting success criteria"
          delta={summary.avgChange}
          trend={summary.avgChange >= 0 ? 'up' : 'down'}
          icon={<TrendingUp className="h-5 w-5" />}
          deltaLabel="avg delta"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          title="Revenue vs. Cost runway"
          description="Track revenue momentum against operating expenses to stay ahead of forecasts."
        >
          <RevenueAreaChart data={revenueSeries} />
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-500" /> Revenue
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" /> Operating expense
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-slate-300" /> Monthly cadence
            </span>
          </div>
        </Card>

        <Card
          title="Acquisition channel mix"
          description="Distribution of sourced pipeline this quarter."
        >
          <ChannelDonutChart data={channels} />
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          title="Strategic accounts overview"
          description="Filter by status to pinpoint accounts that need intervention."
        >
          <AccountTable accounts={accounts} summary={summary} />
        </Card>

        <Card
          title="Product performance"
          description="Revenue contribution and growth by product line."
        >
          <ProductBarChart data={products} />
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          title="Latest signal feed"
          description="Important events from sales, support, finance, and product."
        >
          <ActivityFeed items={activity} />
        </Card>

        <Card
          title="Strategic program goals"
          description="Progress against quarterly initiatives."
        >
          <GoalProgressList goals={goals} />
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
