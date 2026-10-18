
'use client'

import { useMemo, useState } from 'react'
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
import {
  chinaCommodityColumns,
  russiaCommodityColumns,
  commodityLabels,
} from '@/lib/trade-concentration-columns'

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

const CHINA = 'var(--accent-research)'
const RUSSIA = 'var(--accent-engineering)'

function monthLabel(value: string) {
  const match = value.match(/^(\d{4})-M?(\d{1,2})$/)

  if (!match) return value

  return new Date(
    Date.UTC(Number(match[1]), Number(match[2]) - 1, 1),
  ).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function yearOf(month: string) {
  return Number(month.slice(0, 4))
}

function SeriesStats({
  rows,
  columns,
}: {
  rows: ChartRow[]
  columns: string[]
}) {
  const stats = useMemo(
    () =>
      columns
        .map((column) => {
          const values = rows
            .map((row) => row[column])
            .filter(
              (value): value is number =>
                typeof value === 'number' && Number.isFinite(value),
            )

          return {
            column,
            mean: values.length
              ? values.reduce((sum, value) => sum + value, 0) / values.length
              : null,
            peak: values.length ? Math.max(...values) : null,
          }
        })
        .filter((item) => item.mean !== null)
        .sort((a, b) => b.mean! - a.mean!)
        .slice(0, 3),
    [rows, columns],
  )

  return (
    <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map(({ column, mean, peak }, index) => (
        <div
          key={column}
          className="rounded-xl border border-border bg-card/60 p-4"
        >
          <dt className="flex items-center gap-2 font-medium">
            <span className="text-muted-foreground">
              #{index + 1}
            </span>
            {commodityLabels[column] ?? column.replace('_CON', '')}
          </dt>

          <dd className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <span>
              <span className="block text-muted-foreground">Mean share</span>
              <span className="tabular-nums">
                {mean !== null ? `${mean.toFixed(2)}%` : '—'}
              </span>
            </span>

            <span>
              <span className="block text-muted-foreground">Peak share</span>
              <span className="tabular-nums">
                {peak !== null ? `${peak.toFixed(2)}%` : '—'}
              </span>
            </span>
          </dd>
        </div>
      ))}
    </dl>
  )
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
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">{title}</h3>

      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No commodity data is available for this range.
        </p>
      ) : (
        <>
          <figure className="rounded-xl border border-border bg-card/60 p-4">
            <div className="h-80 w-full md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={rows}
                  margin={{ top: 8, right: 16, bottom: 24, left: 8 }}
                >
                  <CartesianGrid
                    stroke="var(--border)"
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="Month"
                    tickFormatter={(month: string) =>
                      String(yearOf(month))
                    }
                    minTickGap={40}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    stroke="var(--border)"
                    label={{
                      value: 'Month',
                      position: 'insideBottom',
                      offset: -16,
                      fill: 'var(--muted-foreground)',
                      fontSize: 12,
                    }}
                  />
                  <YAxis
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    stroke="var(--border)"
                    width={56}
                  />
                  <Tooltip
                    labelFormatter={(label) => monthLabel(String(label))}
                    formatter={(value, name) => [
                      value == null
                        ? 'No data'
                        : `${Number(value).toFixed(2)}%`,
                      commodityLabels[String(name)] ??
                        String(name).replace('_CON', ''),
                    ]}
                    contentStyle={{
                      background: 'var(--popover)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      color: 'var(--foreground)',
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={56}
                    wrapperStyle={{ fontSize: 12 }}
                    formatter={(value) =>
                      commodityLabels[String(value)] ??
                      String(value).replace('_CON', '')
                    }
                  />

                  {columns.map((column, index) => (
                    <Line
                      key={column}
                      type="monotone"
                      dataKey={column}
                      name={column}
                      stroke={palette[index % palette.length]}
                      strokeWidth={1.5}
                      dot={false}
                      connectNulls={false}
                      isAnimationActive={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Monthly export shares for the selected period. Each line
              represents a commodity category.
            </figcaption>
          </figure>

          <div>
            <h4 className="mb-3 text-sm font-medium text-muted-foreground">
              Commodity share statistics
            </h4>
            <SeriesStats rows={rows} columns={columns} />
          </div>
        </>
      )}
    </div>
  )
}

function HhiChart({ rows }: { rows: HhiRow[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">
        Herfindahl–Hirschman Index (HHI)
      </h3>

      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No HHI data is available for this range.
        </p>
      ) : (
        <>
          <figure className="rounded-xl border border-border bg-card/60 p-4">
            <div className="h-80 w-full md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={rows}
                  margin={{ top: 8, right: 16, bottom: 24, left: 8 }}
                >
                  <CartesianGrid
                    stroke="var(--border)"
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="Month"
                    tickFormatter={(month: string) =>
                      String(yearOf(month))
                    }
                    minTickGap={40}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    stroke="var(--border)"
                    label={{
                      value: 'Month',
                      position: 'insideBottom',
                      offset: -16,
                      fill: 'var(--muted-foreground)',
                      fontSize: 12,
                    }}
                  />
                  <YAxis
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    stroke="var(--border)"
                    width={64}
                  />
                  <Tooltip
                    labelFormatter={(label) => monthLabel(String(label))}
                    formatter={(value, name) => [
                      value == null
                        ? 'No data'
                        : Number(value).toLocaleString(undefined, {
                            maximumFractionDigits: 4,
                          }),
                      name === 'CHN_HHI' ? 'China HHI' : 'Russia HHI',
                    ]}
                    contentStyle={{
                      background: 'var(--popover)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      color: 'var(--foreground)',
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={28}
                    wrapperStyle={{ fontSize: 13 }}
                    formatter={(value) =>
                      value === 'CHN_HHI' ? 'China' : 'Russia'
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="CHN_HHI"
                    name="CHN_HHI"
                    stroke={CHINA}
                    strokeWidth={1.8}
                    dot={false}
                    connectNulls={false}
                    isAnimationActive={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="RUS_HHI"
                    name="RUS_HHI"
                    stroke={RUSSIA}
                    strokeWidth={1.8}
                    dot={false}
                    connectNulls={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Monthly export concentration based on the HHI values in the
              research dataset. Higher values indicate greater concentration.
            </figcaption>
          </figure>
        </>
      )}
    </div>
  )
}

export function TradeConcentration({
  chinaRows,
  russiaRows,
  hhi,
}: Props) {
  const allMonths = useMemo(
    () =>
      [...new Set([
        ...chinaRows.map((row) => row.Month),
        ...russiaRows.map((row) => row.Month),
        ...hhi.map((row) => row.Month),
      ])].sort(),
    [chinaRows, russiaRows, hhi],
  )

  const firstYear = allMonths.length ? yearOf(allMonths[0]) : 2010
  const lastYear = allMonths.length
    ? yearOf(allMonths[allMonths.length - 1])
    : firstYear

  const years = useMemo(
    () =>
      Array.from(
        { length: lastYear - firstYear + 1 },
        (_, index) => firstYear + index,
      ),
    [firstYear, lastYear],
  )

  const [start, setStart] = useState(firstYear)
  const [end, setEnd] = useState(lastYear)

  const presets = [
    { label: 'Full history', start: firstYear },
    { label: 'Since 2015', start: Math.max(2015, firstYear) },
    { label: 'Since 2020', start: Math.max(2020, firstYear) },
  ]

  const filterRows = <T extends { Month: string }>(rows: T[]) =>
    rows.filter((row) => {
      const year = yearOf(row.Month)
      return year >= start && year <= end
    })

  const filteredChina = useMemo(
    () => filterRows(chinaRows),
    [chinaRows, start, end],
  )
  const filteredRussia = useMemo(
    () => filterRows(russiaRows),
    [russiaRows, start, end],
  )
  const filteredHhi = useMemo(
    () => filterRows(hhi),
    [hhi, start, end],
  )

  const latestMonth = allMonths[allMonths.length - 1]

  const selectClass =
    'rounded-md border border-input bg-background px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="concentration-start"
            className="text-xs text-muted-foreground"
          >
            From
          </label>
          <select
            id="concentration-start"
            className={selectClass}
            value={start}
            onChange={(event) =>
              setStart(Math.min(Number(event.target.value), end))
            }
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="concentration-end"
            className="text-xs text-muted-foreground"
          >
            To
          </label>
          <select
            id="concentration-end"
            className={selectClass}
            value={end}
            onChange={(event) =>
              setEnd(Math.max(Number(event.target.value), start))
            }
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div
          role="group"
          aria-label="Date range presets"
          className="flex flex-wrap gap-2"
        >
          {presets.map((preset) => {
            const active = start === preset.start && end === lastYear

            return (
              <button
                key={preset.label}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setStart(preset.start)
                  setEnd(lastYear)
                }}
                className="rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent aria-pressed:bg-secondary aria-pressed:text-foreground"
              >
                {preset.label}
              </button>
            )
          })}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {start}–{end}.
        {latestMonth ? ` Latest observation: ${monthLabel(latestMonth)}.` : ''}
      </p>

      <CommodityChart
        title="China's export commodity shares"
        rows={filteredChina}
        columns={chinaCommodityColumns}
      />

      <CommodityChart
        title="Russia's export commodity shares"
        rows={filteredRussia}
        columns={russiaCommodityColumns}
      />

      <HhiChart rows={filteredHhi} />
    </div>
  )
}
