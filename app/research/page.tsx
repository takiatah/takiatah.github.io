import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { TechTags } from '@/components/tech-tags'

export const metadata: Metadata = {
  title: 'Research Observatory',
  description: 'Research on China–Russia trade relationships and geopolitical risk.',
}

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Destination 03"
        title="Research Observatory"
        description="Data-driven research on trade relationships and geopolitical risk, built as interactive dashboards with clearly documented sources."
        accentVar="--accent-research"
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card/80 p-6 md:p-8">
          <span className="text-xs font-medium uppercase tracking-wider text-research">Research dashboard</span>
          <h2 className="text-2xl font-semibold">Decision Risks in Russia–China Trade</h2>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">
            An interactive dashboard on the risks associated with trade between China and Russia. This dashboard brings together geopolitical, 
            concentration, dependency, transport, and economic risks. The goal of this ongoing project is to put all of these together to 
            create an overall risk framework that can be used on any trade partners. 
          </p>
          <TechTags items={['Recharts', 'Pandas', 'Geopolitical Risk Index', 'Herfindahl–Hirschman Index', 'Trade Dependency', 'TypeScript']} />
          <Link
            href="/research/china-russia-trade"
            className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Open the dashboard
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </article>
      </section>
    </>
  )
}
