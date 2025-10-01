import { BarChart3, Filter, Target } from 'lucide-react'
import Card from '../components/ui/Card'
import RevenueAreaChart from '../components/charts/RevenueAreaChart'
import { useAppSelector } from '../app/hooks'
import { selectRevenueSeries } from '../features/dashboard/dashboardSlice'

const AnalyticsPage = () => {
  const revenueSeries = useAppSelector(selectRevenueSeries)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Advanced analytics workspace</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Explore revenue quality, segmentation, and retention insights. Layer filters to answer "why" behind each trend.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-600 transition hover:border-brand-300 hover:text-brand-600">
            <Filter className="h-4 w-4" /> Manage segments
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 font-semibold text-white shadow hover:bg-brand-500">
            <Target className="h-4 w-4" /> Save cohort view
          </button>
        </div>
      </div>

      <Card
        title="Retention cohort explorer"
        description="Revenue retention indexed to cohort activation date."
      >
        <RevenueAreaChart data={revenueSeries} />
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          title="Funnel conversion snapshots"
          description="Conversion between lifecycle stages for the most recent 90 days."
        >
          <dl className="grid gap-4 text-sm text-slate-500">
            <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
              <span>Marketing qualified → Sales accepted</span>
              <span className="font-semibold text-slate-900">42%</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
              <span>Sales accepted → Commit</span>
              <span className="font-semibold text-slate-900">31%</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
              <span>Commit → Closed won</span>
              <span className="font-semibold text-slate-900">68%</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
              <span>Closed won → Renewal</span>
              <span className="font-semibold text-slate-900">82%</span>
            </div>
          </dl>
        </Card>

        <Card
          title="Segment spotlight"
          description="Highest leverage segments and the metrics powering them."
        >
          <div className="space-y-4">
            {[{ label: 'Mid-market SaaS', lift: '+18%', signal: 'Adopted automation workflows' }, { label: 'Enterprise Healthcare', lift: '+11%', signal: 'Expanded to analytics add-on' }, { label: 'EMEA Strategic', lift: '+9%', signal: 'Activated multi-region rollout' }].map((segment) => (
              <div key={segment.label} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{segment.label}</p>
                    <p className="text-xs text-slate-500">{segment.signal}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    <BarChart3 className="h-3 w-3" /> {segment.lift}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AnalyticsPage
