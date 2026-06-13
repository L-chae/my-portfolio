'use client';

import Link from 'next/link';
import { AlertCircle, ArrowUpRight, GitBranch } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Badge } from './ui/Badge';
import { LinkButton } from './ui/Button';
import { SectionLayout } from './ui/SectionLayout';
import { SectionHeading } from './ui/SectionHeading';
import { SurfaceCard } from './ui/SurfaceCard';
import { PROJECTS_MOCK } from '../content/projectsMock';

export default function ProjectsSection() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [featuredProject, ...compactProjects] = PROJECTS_MOCK;

  return (
    <div ref={ref}>
      <SectionLayout
        id="projects"
        aside={
          <SectionHeading eyebrow="PROJECTS">
            문제를 정의하고 <br className="hidden md:block" />
            흐름을 개선합니다.
          </SectionHeading>
        }
      >
        <div className="space-y-6">
          <SurfaceCard
            as="article"
            key={featuredProject.projectKey}
            className="scroll-reveal scroll-mt-24 rounded-card border-line-soft bg-surface-glass p-6 transition-all hover:-translate-y-1 hover:border-brand-ring hover:shadow-glow md:scroll-mt-32 md:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="accent">Featured</Badge>
                  <span className="text-sm font-semibold text-ink-muted">
                    {featuredProject.displayLabel}
                  </span>
                </div>

                <h4 className="mt-3 text-2xl font-bold text-navy md:text-[28px]">
                  <Link
                    href={`/projects/${featuredProject.projectKey}`}
                    className="transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring"
                  >
                    {featuredProject.name}
                  </Link>
                </h4>

                <p className="mt-3 max-w-2xl break-keep text-[15px] leading-7 text-ink">
                  {featuredProject.summary}
                </p>
              </div>

              <LinkButton
                href={`/projects/${featuredProject.projectKey}`}
                variant="primary"
                className="w-max shrink-0"
              >
                상세보기
                <ArrowUpRight size={14} aria-hidden="true" />
              </LinkButton>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <section className="rounded-panel border border-line-soft bg-surface-soft p-5">
                <div className="flex items-center gap-2 text-ink-muted">
                  <AlertCircle size={16} aria-hidden="true" className="text-brand" />
                  <p className="text-xs font-bold uppercase tracking-[0.18em]">Problem</p>
                </div>
                <p className="mt-3 break-keep text-sm leading-7 text-ink">
                  {featuredProject.problem}
                </p>
              </section>

              <section className="rounded-panel border border-line-soft bg-surface-soft p-5">
                <div className="flex items-center gap-2 text-ink-muted">
                  <GitBranch size={16} aria-hidden="true" className="text-accent" />
                  <p className="text-xs font-bold uppercase tracking-[0.18em]">Approach</p>
                </div>
                <p className="mt-3 break-keep text-sm leading-7 text-ink">
                  {featuredProject.solution}
                </p>
              </section>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-line-soft pt-5 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {featuredProject.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>

              {featuredProject.links.length > 0 && (
                <div className="flex flex-wrap items-center gap-3">
                  {featuredProject.links.map((link) => (
                    <a
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      className="text-sm font-semibold text-ink transition-colors hover:text-navy"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </SurfaceCard>

          <div className="grid gap-6 md:grid-cols-2">
            {compactProjects.map((project) => (
              <SurfaceCard
                as="article"
                key={project.projectKey}
                className="scroll-reveal scroll-mt-24 rounded-card border-line-soft bg-surface-glass p-6 transition-all hover:-translate-y-1 hover:border-brand-ring hover:shadow-glow md:scroll-mt-32"
              >
                <div className="flex h-full flex-col">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-ink-muted">
                        {project.displayLabel}
                      </span>
                    </div>

                    <h4 className="mt-3 text-2xl font-bold text-navy md:text-[28px]">
                      <Link
                        href={`/projects/${project.projectKey}`}
                        className="transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring"
                      >
                        {project.name}
                      </Link>
                    </h4>

                    <p className="mt-3 break-keep text-[15px] leading-7 text-ink">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-4 border-t border-line-soft pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium text-ink-muted">
                      {project.displayLabel}
                    </p>

                    <LinkButton
                      href={`/projects/${project.projectKey}`}
                      variant="primary"
                      className="w-max shrink-0"
                    >
                      상세보기
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </LinkButton>
                  </div>

                  {project.links.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.links.map((link) => (
                        <a
                          key={`${link.label}-${link.href}`}
                          href={link.href}
                          className="text-sm font-semibold text-ink transition-colors hover:text-navy"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </SectionLayout>
    </div>
  );
}
