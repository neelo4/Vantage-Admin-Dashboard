import clsx from 'clsx'
import type { AccountRecord } from '../../data/mockData'

type Status = AccountRecord['status']

const statusCopy: Record<Status, { label: string; className: string }> = {
  'on-track': {
    label: 'On Track',
    className: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
  },
  'at-risk': {
    label: 'At Risk',
    className: 'bg-amber-50 text-amber-600 ring-amber-100',
  },
  blocked: {
    label: 'Blocked',
    className: 'bg-rose-50 text-rose-600 ring-rose-100',
  },
}

interface StatusBadgeProps {
  status: Status
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const copy = statusCopy[status]

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset',
        copy.className,
      )}
    >
      {copy.label}
    </span>
  )
}

export default StatusBadge
