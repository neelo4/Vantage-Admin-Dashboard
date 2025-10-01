import { ShieldCheck, ShieldEllipsis } from 'lucide-react'
import Card from '../components/ui/Card'

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">Admin settings</h1>
        <p className="text-sm text-slate-500">
          Manage data access, governance, and integrations. Only administrators can make changes on this page.
        </p>
      </div>

      <Card
        title="Role-based access controls"
        description="Define who can view, edit, or export sensitive revenue data."
        action={
          <button className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-500">
            <ShieldCheck className="h-4 w-4" /> Publish changes
          </button>
        }
      >
        <div className="space-y-4 text-sm text-slate-600">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <p className="font-semibold text-slate-900">Admin</p>
              <p className="text-xs text-slate-500">Full access, including data exports and integrations.</p>
            </div>
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">Enabled</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <p className="font-semibold text-slate-900">Editor</p>
              <p className="text-xs text-slate-500">Can modify dashboards, run analyses, and manage reports.</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Enabled</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <p className="font-semibold text-slate-900">Viewer</p>
              <p className="text-xs text-slate-500">Can access dashboards and run saved filters.</p>
            </div>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">Read only</span>
          </div>
        </div>
      </Card>

      <Card title="Governance & compliance" description="Incident logging, retention policies, and audit trails.">
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
            <span>Audit trail logging</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">Active</span>
          </li>
          <li className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
            <span>PII redaction</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">Active</span>
          </li>
          <li className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
            <span>SOC 2 reporting</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-600">In review</span>
          </li>
          <li className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
            <span>Data retention window</span>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">36 months</span>
          </li>
        </ul>
      </Card>

      <Card title="Integration webhooks" description="Manage downstream syncs to CRM, billing, and data stack.">
        <div className="space-y-4 text-sm text-slate-600">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-slate-300 px-4 py-3">
            <div>
              <p className="font-semibold text-slate-900">Salesforce bi-directional sync</p>
              <p className="text-xs text-slate-500">Leads, opportunities, attribution data</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-500 hover:border-brand-200 hover:text-brand-600">
              <ShieldEllipsis className="h-3.5 w-3.5" /> Manage
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-slate-300 px-4 py-3">
            <div>
              <p className="font-semibold text-slate-900">NetSuite financial exports</p>
              <p className="text-xs text-slate-500">ARR true-up, deferred revenue, expense detail</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-500 hover:border-brand-200 hover:text-brand-600">
              <ShieldEllipsis className="h-3.5 w-3.5" /> Manage
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SettingsPage
