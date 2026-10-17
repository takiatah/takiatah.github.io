
'use client'

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chinaCommodityColumns, russiaCommodityColumns, commodityLabels, } from '@/lib/trade-concentration-columns'

type ChartRow = {
  Month: string
  [key: string]: string | number | null
}

type HhiRow = {
  Month: string
  CHN_HHI: number | null
  RUS_HHI: number | null
}

type Props = {
  chinaRows: ChartRow[]
  russiaRows: ChartRow[]
  hhi: HhiRow[]
}

const palette = [
  '#0D9488', '#D97706', '#6366F1', '#DB2777',
  '#0284C7', '#65A30D', '#9333EA', '#EA580C',
  '#0891B2', '#A16207', '#64748B',
]

const chartStyle = {
  fontSize: 12,
  color: 'var(--muted-foreground)',
}

function monthLabel(value: string) {
  const match = value.match(/^(\d{4})-M?(\d{1,2})$/)
  return match
    ? `${match[2].padStart(2, '0')}/${match[1]}`
    : value
}

function CommodityChart({
  title,
  rows,
  columns,
}: {
  title: string
  rows: ChartRow[]
  columns: string[]
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold">{title}</h3>

      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No commodity data is available.
        </p>
      ) : (
        <div className="h-[420px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rows} margin={{ top: 12, right: 20, bottom: 8, left: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="Month"
                tickFormatter={monthLabel}
                minTickGap={35}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
              />
              <YAxis
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
              />
              <Tooltip
                labelFormatter={(label) => monthLabel(String(label))}
                formatter={(value, name) => [
                  value == null ? 'No data' : `${Number(value).toFixed(2)}%`,
                  commodityLabels[String(name)] ??
                    String(name).replace('_CON', ''),
                ]}
                contentStyle={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                }}
              />
              <Legend
                formatter={(value) =>
                  commodityLabels[String(value)] ?? String(value).replace('_CON', '')
                }
              />

              {columns.map((column, index) => (
                <Line
                  key={column}
                  type="monotone"
                  dataKey={column}
                  name={column}
                  stroke={palette[index % palette.length]}
                  strokeWidth={1.8}
                  dot={false}
                  connectNulls={false}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

function HhiChart({ rows }: { rows: HhiRow[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold">Herfindahl–Hirschman Index (HHI)</h3>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ top: 12, right: 20, bottom: 8, left: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="Month" tickFormatter={monthLabel} minTickGap={35} />
            <YAxis />
            <Tooltip
              labelFormatter={(label) => monthLabel(String(label))}
              formatter={(value, name) => [
                value == null ? 'No data' : Number(value).toLocaleString(),
                name === 'CHN_HHI' ? 'China HHI' : 'Russia HHI',
              ]}
            />
            <Legend formatter={(value) => value === 'CHN_HHI' ? 'China' : 'Russia'} />
            <Line
              dataKey="CHN_HHI"
              stroke={palette[0]}
              strokeWidth={2}
              dot={false}
              connectNulls={false}
            />
            <Line
              dataKey="RUS_HHI"
              stroke={palette[1]}
              strokeWidth={2}
              dot={false}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function TradeConcentration({ chinaRows, russiaRows, hhi }: Props) {
  return (
    <div className="flex flex-col gap-10">
      <CommodityChart
        title="China's export commodity shares"
        rows={chinaRows}
        columns={chinaCommodityColumns}
      />

      <CommodityChart
        title="Russia's export commodity shares"
        rows={russiaRows}
        columns={russiaCommodityColumns}
      />

      <HhiChart rows={hhi} />
    </div>
  )
}
