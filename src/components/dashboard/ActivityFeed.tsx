import { Briefcase, FlaskConical, LifeBuoy, PiggyBank } from 'lucide-react'
import { useMemo } from 'react'
import type { ActivityItem } from '../../data/mockData'

interface ActivityFeedProps {
  items: ActivityItem[]
}

const iconPalette: Record<ActivityItem['type'], { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; color: string }> = {
  deal: { icon: Briefcase, color: 'bg-brand-100 text-brand-600' },
  support: { icon: LifeBuoy, color: 'bg-emerald-100 text-emerald-600' },
  product: { icon: FlaskConical, color: 'bg-sky-100 text-sky-600' },
  finance: { icon: PiggyBank, color: 'bg-amber-100 text-amber-600' },
}

const ActivityFeed = ({ items }: ActivityFeedProps) => {
  const timeFormatter = useMemo(
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
    <ol className="relative space-y-4 border-l border-dashed border-slate-200 pl-6">
      {items.map((item) => {
        const { icon: Icon, color } = iconPalette[item.type]
        return (
          <li key={item.id} className="relative rounded-2xl border border-transparent bg-white px-4 py-4 shadow-sm transition hover:border-brand-100 hover:shadow-md">
            <span
              className={`absolute -left-[29px] flex h-12 w-12 items-center justify-center rounded-full border-4 border-white ${color}`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium text-slate-900">{item.event}</p>
            <p className="mt-1 text-xs text-slate-500">
              {timeFormatter.format(new Date(item.timestamp))} · {item.actor}
            </p>
          </li>
        )
      })}
    </ol>
  )
}

export default ActivityFeed
