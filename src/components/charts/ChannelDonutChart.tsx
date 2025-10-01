import { arc, pie } from 'd3'
import type { PieArcDatum } from 'd3'
import { useMemo } from 'react'
import type { ChannelSplit } from '../../data/mockData'

interface ChannelDonutChartProps {
  data: ChannelSplit[]
}

const size = 260
const radius = size / 2
const innerRadius = radius * 0.58

const palette = ['#6366F1', '#22C55E', '#F97316', '#0EA5E9', '#F43F5E']

const ChannelDonutChart = ({ data }: ChannelDonutChartProps) => {
  const arcs = useMemo(() => {
    const pieGenerator = pie<ChannelSplit>().value((d: ChannelSplit) => d.value).sort(null)
    return pieGenerator(data)
  }, [data])

  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data])

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[240px]">
        <g transform={`translate(${radius}, ${radius})`}>
          {arcs.map((arcDatum: PieArcDatum<ChannelSplit>, index) => {
            const arcGenerator = arc<PieArcDatum<ChannelSplit>>()
              .innerRadius(innerRadius)
              .outerRadius(radius - 4)
              .cornerRadius(12)

            return (
              <path
                key={arcDatum.data.channel}
                d={arcGenerator(arcDatum) ?? undefined}
                fill={palette[index % palette.length]}
                stroke="white"
                strokeWidth={2}
              />
            )
          })}

          <circle r={innerRadius - 4} fill="white" />
          <text textAnchor="middle" className="text-xl font-semibold fill-slate-900">
            {Math.round(total)}%
          </text>
          <text y={20} textAnchor="middle" className="text-xs uppercase tracking-wide fill-slate-400">
            Split
          </text>
        </g>
      </svg>

      <dl className="grid w-full gap-2 text-sm text-slate-600">
        {data.map((item, index) => (
          <div key={item.channel} className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-1.5">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: palette[index % palette.length] }}
              />
              <dt className="font-medium">{item.channel}</dt>
            </div>
            <dd>{item.value}%</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default ChannelDonutChart
