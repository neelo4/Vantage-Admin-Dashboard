import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { useMemo } from 'react'
import type { AccountRecord } from '../../data/mockData'
import StatusBadge from '../ui/StatusBadge'

interface AccountTableProps {
  accounts: AccountRecord[]
  summary: {
    totalMrr: number
    avgChange: number
    statusTally: Record<AccountRecord['status'], number>
  }
}

const AccountTable = ({ accounts, summary }: AccountTableProps) => {
  const currency = useMemo(
    () => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
    [],
  )

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
    [],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
        <span>
          <strong className="font-semibold text-slate-900">{accounts.length}</strong> active accounts
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" /> {summary.statusTally['on-track']} on track
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" /> {summary.statusTally['at-risk']} at risk
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" /> {summary.statusTally.blocked} blocked
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Account</th>
              <th className="px-4 py-3 font-medium">Owner</th>
              <th className="px-4 py-3 font-medium">Industry</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">MRR</th>
              <th className="px-4 py-3 font-medium">Δ 30d</th>
              <th className="px-4 py-3 font-medium">Last touch</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
            {accounts.map((account) => {
              const isPositive = account.change >= 0
              return (
                <tr key={account.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{account.company}</div>
                    <div className="text-xs text-slate-400">{account.id}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{account.owner}</div>
                  </td>
                  <td className="px-4 py-3">{account.industry}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={account.status} />
                  </td>
                  <td className="px-4 py-3 font-medium">{currency.format(account.mrr)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        isPositive
                          ? 'inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600'
                          : 'inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600'
                      }
                    >
                      {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {Math.abs(account.change).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {dateFormatter.format(new Date(account.lastTouch))}
                  </td>
                </tr>
              )
            })}

            {accounts.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-400">
                  No accounts match your filters yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-100 px-4 py-3 text-xs text-slate-600">
        <span>
          Portfolio MRR: <strong className="text-slate-900">{currency.format(summary.totalMrr)}</strong>
        </span>
        <span>
          Average 30-day delta:{' '}
          <strong className={summary.avgChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
            {summary.avgChange >= 0 ? '+' : ''}
            {summary.avgChange.toFixed(1)}%
          </strong>
        </span>
      </div>
    </div>
  )
}

export default AccountTable
