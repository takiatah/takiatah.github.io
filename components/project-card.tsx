import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { ProjectActions } from '@/components/project-actions'
import { TechTags } from '@/components/tech-tags'

interface ProjectCardProps {
  project: Project
  accentVar: string
  href?: string
  featured?: boolean
  children?: React.ReactNode
}

export function ProjectCard({ project, accentVar, href, featured, children }: ProjectCardProps) {
  return (
    <article
      className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card/80 p-6"
      style={featured ? { boxShadow: `inset 0 0 0 1px var(${accentVar})` } : undefined}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: `var(${accentVar})` }}>
          {project.category}
        </span>
        {project.status === 'concept' && (
          <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
            Concept / prototype
          </span>
        )}
        {featured && (
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-foreground">Featured</span>
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold">{project.title}</h3>
        {project.subtitle && <p className="text-sm text-muted-foreground">{project.subtitle}</p>}
      </div>
      <p className="text-pretty leading-relaxed text-muted-foreground">{project.summary}</p>
      {children}
      <TechTags items={project.tech} />
      <div className="mt-auto flex flex-col gap-3 pt-2">
        {project.status !== 'concept' && <ProjectActions project={project} />}
        {href && (
          <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline">
            View project
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  )
}
