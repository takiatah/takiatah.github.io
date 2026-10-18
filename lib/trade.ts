
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { parse } from 'csv-parse/sync'
import { chinaCommodityColumns, russiaCommodityColumns, } from '@/lib/trade-concentration-columns'

type CsvRow = Record<string, string>

function readCsv(filename: string): CsvRow[] {
  const filepath = path.join(process.cwd(), 'lib', 'data', filename)
  const content = readFileSync(filepath, 'utf8')

  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    trim: true,
  }) as CsvRow[]
}

function numeric(value: string | undefined): number | null {
  if (value == null || value.trim() === '') return null

  const result = Number(value) * 100
  return Number.isFinite(result) ? result : null
}

function numericHHI(value: string | undefined): number | null {
  if (value == null || value.trim() === '') return null

  const result = Number(value)
  return Number.isFinite(result) ? result : null
}


export function loadTradeConcentrationData() {
  const china = readCsv('china_commodity_exports.csv')
  const russia = readCsv('russia_commodity_exports.csv')
  const main = readCsv('main_data.csv')

  const hhiByMonth = new Map(
    main.map((row) => [
      row.Month,
      {
        china: numericHHI(row.CHN_HHI),
        russia: numericHHI(row.RUS_HHI),
      },
    ]),
  )

  function prepare(rows: CsvRow[], columns: string[]) {
    return rows
      .map((row) => ({
        Month: row.Month,
        ...Object.fromEntries(
          columns.map((column) => [column, numeric(row[column])]),
        ),
      }))
      .filter((row) => row.Month)
      .sort((a, b) => a.Month.localeCompare(b.Month))
  }

  const chinaRows = prepare(china, chinaCommodityColumns)
  const russiaRows = prepare(russia, russiaCommodityColumns)

  const hhi = [...hhiByMonth.entries()]
    .map(([Month, values]) => ({
      Month,
      CHN_HHI: values.china,
      RUS_HHI: values.russia,
    }))
    .sort((a, b) => a.Month.localeCompare(b.Month))

  // load trade dependency data from main_data.csv.
  const dependencyRows = main
    .map((row) => ({
      Month: row.Month,
      RUS_IMP_DEP: numeric(row.RUS_IMP_DEP),
      RUS_EXP_DEP: numeric(row.RUS_EXP_DEP),
      CHN_IMP_DEP: numeric(row.CHN_IMP_DEP),
      CHN_EXP_DEP: numeric(row.CHN_EXP_DEP),
    }))
    .filter((row) => row.Month)
    .sort((a, b) => a.Month.localeCompare(b.Month))

  return {
    chinaRows,
    russiaRows,
    hhi,
    dependencyRows,
  }
}
