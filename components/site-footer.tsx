import Link from 'next/link'
import { profileLinks } from '@/lib/links'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p>Portfolio · Takia Tahmid</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href={profileLinks.github} className="hover:text-foreground" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={profileLinks.linkedin} className="hover:text-foreground" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
