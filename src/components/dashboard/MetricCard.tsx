import clsx from 'clsx'
import type { ReactNode } from 'react'

interface MetricCardProps {
  label: string
  value: string
  secondary?: string
  delta?: number
  deltaLabel?: string
  icon: ReactNode
  trend?: 'up' | 'down' | 'neutral'
}

const MetricCard = ({ label, value, secondary, delta, deltaLabel, icon, trend = 'neutral' }: MetricCardProps) => {
  const trendCopy: Record<NonNullable<MetricCardProps['trend']>, string> = {
    up: 'text-emerald-600',
    down: 'text-rose-600',
    neutral: 'text-slate-500',
  }

  const formattedDelta =
    delta === undefined ? null : `${delta > 0 ? '+' : ''}${delta.toFixed(1)}%${deltaLabel ? ` ${deltaLabel}` : ''}`

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-brand-50 p-3 text-brand-600">{icon}</div>
        {formattedDelta && (
          <span className={clsx('text-xs font-semibold', trendCopy[trend])}>{formattedDelta}</span>
        )}
      </div>
      <div className="mt-8">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
        {secondary && <p className="mt-2 text-xs text-slate-400">{secondary}</p>}
      </div>
    </div>
  )
}

export default MetricCard
