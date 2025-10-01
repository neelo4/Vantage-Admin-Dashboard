import { area, curveCatmullRom, extent, line, max, scaleLinear, scaleTime } from 'd3'
import { useId, useMemo } from 'react'
import type { RevenuePoint } from '../../data/mockData'

interface RevenueAreaChartProps {
  data: RevenuePoint[]
}

type EnrichedPoint = Omit<RevenuePoint, 'date'> & { date: Date }

interface ChartScales {
  areaPath: string
  expensePath: string
  revenueLinePath: string
  xTicks: { value: Date; x: number }[]
  yTicks: { value: number; y: number }[]
  lastRevenue: { x: number; y: number } | null
  lastExpense: { x: number; y: number } | null
}

const width = 820
const height = 320
const margin = { top: 24, right: 32, bottom: 48, left: 64 }
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

const RevenueAreaChart = ({ data }: RevenueAreaChartProps) => {
  const gradientId = useId()

  const formatter = useMemo(
    () => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }),
    [],
  )

  const emptyChart: ChartScales = {
    areaPath: '',
    expensePath: '',
    revenueLinePath: '',
    xTicks: [],
    yTicks: [],
    lastExpense: null,
    lastRevenue: null,
  }

  const chart = useMemo<ChartScales>(() => {
    if (data.length === 0) {
      return emptyChart
    }

    const parsedDates: EnrichedPoint[] = data.map((d) => ({
      date: new Date(d.date),
      revenue: d.revenue,
      expenses: d.expenses,
      newCustomers: d.newCustomers,
    }))

    const domain = extent(parsedDates, (d) => d.date)
    if (!domain[0] || !domain[1]) {
      return emptyChart
    }

    const xScale = scaleTime().domain([domain[0], domain[1]]).range([0, innerWidth])

    const maxValue =
      max(parsedDates, (d) => Math.max(d.revenue, d.expenses)) ?? 0

    const yScale = scaleLinear().domain([0, maxValue * 1.1]).range([innerHeight, 0]).nice()

    const revenueArea = area<EnrichedPoint>()
      .x((d) => xScale(d.date))
      .y0(innerHeight)
      .y1((d) => yScale(d.revenue))
      .curve(curveCatmullRom.alpha(0.6))

    const revenueLine = line<EnrichedPoint>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.revenue))
      .curve(curveCatmullRom.alpha(0.6))

    const expenseLine = line<EnrichedPoint>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.expenses))
      .curve(curveCatmullRom.alpha(0.6))

    const xTicks = xScale.ticks(6).map((value) => ({ value, x: xScale(value) }))
    const yTicks = yScale.ticks(5).map((value) => ({ value, y: yScale(value) }))

    const lastPoint = parsedDates[parsedDates.length - 1]
    const lastRevenue = { x: xScale(lastPoint.date), y: yScale(lastPoint.revenue) }
    const lastExpense = { x: xScale(lastPoint.date), y: yScale(lastPoint.expenses) }

    return {
      areaPath: revenueArea(parsedDates) ?? '',
      revenueLinePath: revenueLine(parsedDates) ?? '',
      expensePath: expenseLine(parsedDates) ?? '',
      xTicks,
      yTicks,
      lastRevenue,
      lastExpense,
    }
  }, [data])

  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat('en-US', { month: 'short' }),
    [],
  )

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" className="w-full">
        <defs>
          <linearGradient id={`${gradientId}-fill`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="rgb(96 165 250)" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {chart.yTicks.map((tick) => (
            <g key={tick.value} transform={`translate(0, ${tick.y})`}>
              <line x1={0} x2={innerWidth} stroke="rgb(226 232 240)" strokeDasharray="4 6" />
              <text
                x={-16}
                dy="0.32em"
                textAnchor="end"
                className="fill-slate-400 text-xs"
              >
                {formatter.format(tick.value)}
              </text>
            </g>
          ))}

          <g transform={`translate(0, ${innerHeight})`}>
            <line x1={0} x2={innerWidth} stroke="rgb(203 213 225)" />
            {chart.xTicks.map((tick) => (
              <g key={tick.value.toISOString()} transform={`translate(${tick.x}, 0)`}>
                <line y2={6} stroke="rgb(203 213 225)" />
                <text
                  y={18}
                  textAnchor="middle"
                  className="fill-slate-400 text-xs"
                >
                  {monthFormatter.format(tick.value)}
                </text>
              </g>
            ))}
          </g>

          <path d={chart.areaPath} fill={`url(#${gradientId}-fill)`} />
          <path d={chart.revenueLinePath} fill="none" stroke="rgb(79 70 229)" strokeWidth={3} />
          <path d={chart.expensePath} fill="none" stroke="rgb(248 113 113)" strokeWidth={2} strokeDasharray="6 6" />

          {chart.lastRevenue && (
            <circle r={5} cx={chart.lastRevenue.x} cy={chart.lastRevenue.y} fill="rgb(79 70 229)" stroke="white" strokeWidth={2} />
          )}

          {chart.lastExpense && (
            <circle r={5} cx={chart.lastExpense.x} cy={chart.lastExpense.y} fill="white" stroke="rgb(248 113 113)" strokeWidth={2} />
          )}
        </g>
      </svg>
    </div>
  )
}

export default RevenueAreaChart
