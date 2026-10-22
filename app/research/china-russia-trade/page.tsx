import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { GprChart } from '@/components/research/gpr-chart'
import { TradeConcentration } from '@/components/research/trade-concentration'
import { externalLinks } from '@/lib/links'
import { loadTradeConcentrationData } from '@/lib/trade'
import { TradeDependency } from '@/components/research/trade-dependency'

export const metadata: Metadata = {
  title: 'China–Russia Trade Relations',
  description:
    'Interactive dashboard of the Geopolitical Risk Index for China and Russia, with a methodology for measuring bilateral trade concentration.',
}

function Panel({ id, title, description, children }: { id: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card/40 p-5 md:p-8">
      <div>
        <h2 id={id} className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2 max-w-4xl leading-relaxed text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}

export default function ChinaRussiaTradePage() {
  const concentrationData = loadTradeConcentrationData()
  return (
    <>
      <PageHero
        eyebrow="Research dashboard"
        title="Decision Risk in Global Supply Chains: The Russia–China Trade Corridor."
        description="How has risk evolved and redistributed in China and Russia trade, and how are they affected by geopolitical disruptions? This dashboard brings together geopolitical, concentration, dependency, transport, and economic risks. The goal is to put all of these together to create an overall risk framework that can be used on any trade partners."
        accentVar="--accent-research"
        backHref="/research"
        backLabel="Back to Research Observatory"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12">
        <Panel
          id="overview"
          title="Dashboard Overview"
          description="China and Russia has been chosen as the case study because trade between them has been rapidly increasing, especially after the Russian annexation of Crimea in February 2014 and Russia's invasion of Ukraine in February 2022. These events drastically changed global supply chains and trade dynamics, as Russia was forced to reduce trade with Western countries and rely more on China. While some risks were reduced, new risks were introduced. The research concentrates on how trade and risk factors are affected by these disputions. The dashboard focuses on 5 risk areas: geopolitical, concentration, dependency, transport, and economic risks."
        >
          <h1></h1>
        </Panel>
        <Panel
          id="gpr"
          title="Geopolitical Risk"
          description="The country-specific Geopolitical Risk (GPR) Index measures the share of newspaper articles that discuss adverse geopolitical events and mention a given country. Higher values mean more coverage of geopolitical tension involving that country. Both countries' geopilitical risk spikes from February 2022 to March 2022, right after Russia's invasion of Ukraine. Risk also increases in Febrary 2014."
        >
          <GprChart />
          <details className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
            <summary className="cursor-pointer font-medium text-foreground">Source and methodology</summary>
            <div className="mt-3 flex flex-col gap-2 leading-relaxed">
              <p>
                Source: Caldara, Dario and Matteo Iacoviello (2022), “Measuring Geopolitical Risk,” <em>American Economic Review</em>,
                112(4): 1194–1225. Data from{' '}
                <a href={externalLinks.gprDataset} target="_blank" rel="noreferrer" className="text-foreground underline">
                  matteoiacoviello.com/gpr.htm
                </a>
                .
              </p>
              <p>
                Series shown: the historical country-specific indices <code>GPRHC_CHN</code> and <code>GPRHC_RUS</code>, built from
                three newspapers with coverage back to 1900. Values are monthly and expressed as a percentage of all articles in
                those newspapers. They are plotted exactly as published, without smoothing or rescaling.
              </p>
              <p>
                Interpret with care: the index reflects English-language newspaper coverage, so it measures perceived risk rather
                than conflict events directly.
              </p>
            </div>
          </details>
        </Panel>

        <Panel
          id="concentration"
          title="Trade Concentration"
          description="How dependent is each side on a few product categories? Concentration is summarized by each of the top 10 category’s share of reported exports for each country and the Herfindahl–Hirschman Index (HHI). A high HHI indicates exports are more concentrated on a smaller number of categories. Russia has much higher HHI because of its high reliance on mineral fuels, while China's trade is much more spread out. This introduces a concentration risk for Russia. HHI for Russia is heavily influenced by its mineral fuel exports, and it drops in 2020, possibly due to the decrease of fuel exports during the COVID-19 pandemic."
        >
          <TradeConcentration {...concentrationData} />

          <details className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
            <summary className="cursor-pointer font-medium text-foreground">
              Sources, methodology, and data limitations
            </summary>

            <div className="mt-3 flex flex-col gap-2 leading-relaxed">
              <p>
                Commodity-level export data for 2010–2014 are sourced from UN
                Comtrade. Data for 2015–2026 are sourced from the General
                Administration of Customs of China.
              </p>

              <p>
                <strong className="text-foreground">Estimated observations: </strong>
                Values from October 2012 through December 2014, inclusive,
                are estimated based on annual values rather than observed
                monthly values. Interpret month-to-month changes during this
                period with caution.
              </p>

              <p>
                Each commodity line represents the corresponding category's
                share of reported exports, using the precomputed _CON columns
                in the country-specific datasets. The charts do not recalculate
                these shares.
              </p>

              <p>
                The Herfindahl–Hirschman Index (HHI) series uses the
                precomputed CHN_HHI and RUS_HHI columns in main_data.csv.
                HHI measures overall concentration across categories and
                is distinct from the share of any individual commodity.
              </p>

              <p>
                HS codes identify commodity categories. The categories shown
                are the current top ten categories for each country, so they
                should not necessarily be interpreted as the historical top
                ten in every month.
              </p>
            </div>
          </details>
        </Panel>

        <Panel
          id="dependency"
          title="Trade Dependency"
          description="This graph shows monthly import and export dependency between China and Russia. Russia has a much higher dependency on China for both import and exports. Dependency has been increasing after 2014. After February 2022, Russia's export dependency has increased more than import dependency."
        >
          <TradeDependency data={concentrationData.dependencyRows} />
          <details className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
            <summary className="cursor-pointer font-medium text-foreground">
              Source and methodology
            </summary>
            <div className="mt-3 flex flex-col gap-2 leading-relaxed">
              <p>
                Source: International Monetary Fund (IMF),{' '}
                <a
                  href="https://data.imf.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground underline"
                >
                  IMF Data
                </a>
                .
              </p>
              <p>
                Series shown: <code>RUS_IMP_DEP</code>, <code>RUS_EXP_DEP</code>,{' '}
                <code>CHN_IMP_DEP</code>, and <code>CHN_EXP_DEP</code>. These monthly
                indicators measure the relative importance of bilateral trade between
                China and Russia for each country's imports and exports.
              </p>
              <p>
                Import dependency and export dependency are calculated separately
                using bilateral trade flows relative to the corresponding country's
                total trade flows. Values are displayed as percentages.
              </p>
              <p>
                Interpret with care: trade dependency measures the relative importance
                of a trading relationship, not the economic cost of a disruption or
                the availability of alternative suppliers and markets.
              </p>
            </div>
          </details>
        </Panel>
      </div>
    </>
  )
}
