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


type DependencyRow = {
  Month: string
  RUS_IMP_DEP: number | null
  RUS_EXP_DEP: number | null
  CHN_IMP_DEP: number | null
  CHN_EXP_DEP: number | null
}

type Props = {
  data: DependencyRow[]
}

const SERIES = [
  {
    key: 'RUS_IMP_DEP',
    name: 'Russia imports from China',
    color: 'var(--accent-research)',
  },
  {
    key: 'RUS_EXP_DEP',
    name: 'Russia exports to China',
    color: 'var(--accent-engineering)',
  },
  {
    key: 'CHN_IMP_DEP',
    name: 'China imports from Russia',
    color: '#FF7706',
  },
  {
    key: 'CHN_EXP_DEP',
    name: 'China exports to Russia',
    color: '#8B5CF6',
  },
] as const

type SeriesKey = (typeof SERIES)[number]['key']

function monthLabel(month: string) {
  const match = month.match(/^(\d{4})-M?(\d{1,2})$/)

  if (!match) return month

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

function getStats(rows: DependencyRow[], key: SeriesKey) {
  const values = rows
    .map((row) => row[key])
    .filter(
      (value): value is number =>
        typeof value === 'number' && Number.isFinite(value),
    )

  return {
    mean: values.length
      ? values.reduce((sum, value) => sum + value, 0) / values.length
      : null,
    peak: values.length ? Math.max(...values) : null,
  }
}

export function TradeDependency({ data }: Props) {
  const firstYear = data.length ? yearOf(data[0].Month) : 2010
  const lastYear = data.length
    ? yearOf(data[data.length - 1].Month)
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

  const filtered = useMemo(
    () =>
      data.filter((row) => {
        const year = yearOf(row.Month)
        return year >= start && year <= end
      }),
    [data, start, end],
  )

  const stats = useMemo(
    () =>
      SERIES.map((series) => ({
        ...series,
        ...getStats(filtered, series.key),
      })),
    [filtered],
  )

  const latestMonth = data[data.length - 1]?.Month

  const presets = [
    { label: 'Full history', start: firstYear },
    { label: 'Since 2015', start: Math.max(2015, firstYear) },
    { label: 'Since 2020', start: Math.max(2020, firstYear) },
  ]

  const selectClass =
    'rounded-md border border-input bg-background px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="dependency-start"
            className="text-xs text-muted-foreground"
          >
            From
          </label>
          <select
            id="dependency-start"
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
            htmlFor="dependency-end"
            className="text-xs text-muted-foreground"
          >
            To
          </label>
          <select
            id="dependency-end"
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
          aria-label="Range presets"
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

      <figure className="rounded-xl border border-border bg-card/60 p-4">
        <div className="h-80 w-full md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filtered}
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
                label={{
                  value: 'Trade dependency (%)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 4,
                  style: {
                    textAnchor: 'middle',
                    fill: 'var(--muted-foreground)',
                    fontSize: 12,
                  },
                }}
              />

              <Tooltip
                labelFormatter={(label) => monthLabel(String(label))}
                formatter={(value, name) => [
                  value == null
                    ? 'No data'
                    : `${Number(value).toFixed(2)}%`,
                  String(name),
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
                height={48}
                wrapperStyle={{ fontSize: 12 }}
              />

              {SERIES.map((series) => (
                <Line
                  key={series.key}
                  type="monotone"
                  dataKey={series.key}
                  name={series.name}
                  stroke={series.color}
                  dot={false}
                  strokeWidth={1.8}
                  isAnimationActive={false}
                  connectNulls={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <figcaption className="mt-2 text-xs text-muted-foreground">
          Monthly bilateral trade dependency, {start}–{end}. Higher values
          indicate a greater share of the reporting country's total trade
          is associated with its bilateral trade with the partner country.
          {latestMonth ? ` Latest observation: ${monthLabel(latestMonth)}.` : ''}
        </figcaption>
      </figure>

      <dl className="grid gap-3 sm:grid-cols-2">
        {stats.map((series) => (
          <div
            key={series.key}
            className="rounded-xl border border-border bg-card/60 p-4"
          >
            <dt className="flex items-center gap-2 font-medium">
              <span
                aria-hidden="true"
                className="size-2.5 rounded-full"
                style={{ background: series.color }}
              />
              {series.name}
            </dt>

            <dd className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <span>
                <span className="block text-muted-foreground">Mean</span>
                <span className="tabular-nums">
                  {series.mean != null
                    ? `${series.mean.toFixed(2)}%`
                    : '—'}
                </span>
              </span>

              <span>
                <span className="block text-muted-foreground">Peak</span>
                <span className="tabular-nums">
                  {series.peak != null
                    ? `${series.peak.toFixed(2)}%`
                    : '—'}
                </span>
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
