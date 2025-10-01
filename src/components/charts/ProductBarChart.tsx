import { max, scaleBand, scaleLinear } from 'd3'
import { useMemo } from 'react'
import type { ProductPerformance } from '../../data/mockData'

interface ProductBarChartProps {
  data: ProductPerformance[]
}

const width = 360
const height = 260
const margin = { top: 16, right: 24, bottom: 32, left: 160 }
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

const ProductBarChart = ({ data }: ProductBarChartProps) => {
  const formatter = useMemo(
    () => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }),
    [],
  )

  const { bars } = useMemo(() => {
    if (data.length === 0) {
      return {
        bars: [] as { x: number; y: number; width: number; height: number; datum: ProductPerformance }[],
      }
    }

    const y = scaleBand<string>()
      .domain(data.map((d) => d.product))
      .range([0, innerHeight])
      .paddingInner(0.3)
      .paddingOuter(0.2)

    const x = scaleLinear<number, number>()
      .domain([0, (max(data, (d) => d.revenue) ?? 0) * 1.05])
      .range([0, innerWidth])

    const bars = data.map((datum) => ({
      x: 0,
      y: y(datum.product) ?? 0,
      width: x(datum.revenue),
      height: y.bandwidth(),
      datum,
    }))

    return { bars }
  }, [data])

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {bars.map(({ x, y, width: barWidth, height: barHeight, datum }) => (
          <g key={datum.product} transform={`translate(${x}, ${y})`}>
            <rect
              width={barWidth}
              height={barHeight}
              rx={barHeight / 2}
              fill="rgb(59 130 246)"
              className="fill-brand-500/90"
            />
            <text
              x={-16}
              y={barHeight / 2}
              dominantBaseline="middle"
              textAnchor="end"
              className="fill-slate-600 text-sm"
            >
              {datum.product}
            </text>
            <text
              x={barWidth + 12}
              y={barHeight / 2}
              dominantBaseline="middle"
              className="fill-slate-500 text-xs"
            >
              {formatter.format(datum.revenue)}
            </text>
            <text
              x={barWidth - 12}
              y={barHeight / 2}
              dominantBaseline="middle"
              textAnchor="end"
              className="fill-white text-xs"
            >
              +{datum.growth}%
            </text>
          </g>
        ))}

        {bars.length === 0 && (
          <text x={innerWidth / 2} y={innerHeight / 2} textAnchor="middle" className="fill-slate-400 text-sm">
            No data available
          </text>
        )}
      </g>
    </svg>
  )
}

export default ProductBarChart
