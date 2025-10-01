import { FileText, Send, Share2 } from 'lucide-react'
import Card from '../components/ui/Card'

const reportTemplates = [
  {
    name: 'Board-ready scorecard',
    cadence: 'Monthly',
    metrics: ['ARR + QoQ delta', 'Top risk accounts', 'Pipeline coverage'],
  },
  {
    name: 'Customer success briefing',
    cadence: 'Bi-weekly',
    metrics: ['Health scoring', 'Adoption trends', 'Renewal projections'],
  },
  {
    name: 'Revenue operations digest',
    cadence: 'Weekly',
    metrics: ['Funnel conversion', 'Velocity by stage', 'Forecast accuracy'],
  },
]

const ReportsPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Automated report delivery</h1>
          <p className="mt-2 text-sm text-slate-500">
            Configure investor updates, executive summaries, and customer health reviews. Access is limited to editor and
            admin roles.
          </p>
        </div>
        <div className="flex gap-2 text-sm">
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-600 hover:border-brand-300 hover:text-brand-600">
            <FileText className="h-4 w-4" /> Create template
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 font-semibold text-white shadow hover:bg-brand-500">
            <Send className="h-4 w-4" /> Send test report
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {reportTemplates.map((report) => (
          <Card
            key={report.name}
            title={report.name}
            description={`Cadence: ${report.cadence}`}
            action={
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-500 transition hover:border-brand-200 hover:text-brand-600">
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
            }
          >
            <ul className="space-y-2 text-sm text-slate-600">
              {report.metrics.map((metric) => (
                <li key={metric} className="rounded-xl bg-slate-100 px-3 py-2">
                  {metric}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ReportsPage
