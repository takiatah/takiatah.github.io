import Link from 'next/link'
import { DestinationCards, Universe } from '@/components/universe'

export default function HomePage() {
  return (
    <div className="starfield">
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-12 md:pt-16">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-skills">Portfolio of Takia Tahmid</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          A small universe of data, models, and software.
        </h1>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Hi! My name is Takia. I'm a computer science student at the University at Buffalo with an interest in software engineering and data science. Pick a destination to learn more about me. Each world collects a different kind of work, from sales analysis and Kaggle
          competitions to systems programming and web design.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            About me
          </Link>
          <Link href="/skills" className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent">
            Browse skills
          </Link>
        </div>
      </section>

      <section aria-label="Destinations" className="px-4 pb-16">
        <h2 className="sr-only">Destinations</h2>
        <Universe />
        <DestinationCards />
      </section>
    </div>
  )
}
