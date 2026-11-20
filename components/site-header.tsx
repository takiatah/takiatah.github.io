import Link from 'next/link'
import { Menu } from 'lucide-react'
import { destinations } from '@/lib/destinations'

const utilityLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/resume', label: 'Résumé' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-heading text-sm font-semibold tracking-[0.3em]">
          <span aria-hidden="true" className="relative flex size-5 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-skills/60" />
            <span className="size-2 rounded-full bg-skills" />
          </span>
          MY UNIVERSE
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {destinations.map((d) => (
            <li key={d.id}>
              <Link
                href={d.href}
                className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {d.name.replace(' Lab', '').replace(' Constellation', '').replace('Bay', '').replace('Observatory', '').replace('Design Studio', 'Web Design').replace('Architect', 'Web Development').replace('Engineering', 'Software Engineering')}
              </Link>
            </li>
          ))}
          <li aria-hidden="true" className="mx-2 h-4 w-px bg-border" />
          {utilityLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-md px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <details className="group relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent [&::-webkit-details-marker]:hidden">
            <Menu className="size-4" aria-hidden="true" />
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-popover p-2 shadow-xl">
            <p className="px-2 pb-1 pt-1 text-xs uppercase tracking-wider text-muted-foreground">Destinations</p>
            <ul>
              {destinations.map((d) => (
                <li key={d.id}>
                  <Link href={d.href} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent">
                    <span aria-hidden="true" className="size-2 rounded-full" style={{ background: `var(${d.accentVar})` }} />
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="my-2 h-px bg-border" />
            <ul>
              {utilityLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block rounded-md px-2 py-2 text-sm hover:bg-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </nav>
    </header>
  )
}
