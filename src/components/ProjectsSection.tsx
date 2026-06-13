'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Badge } from './ui/Badge';
import { SectionLayout } from './ui/SectionLayout';
import { SectionHeading } from './ui/SectionHeading';
import { SurfaceCard } from './ui/SurfaceCard';
import { PROJECTS_MOCK } from '../content/projectsMock';

const VISIBLE_TECH_COUNT = 4;

function ProjectDetailLink({ projectKey }: { projectKey: string }) {
  return (
    <Link
      href={`/projects/${projectKey}`}
      className="motion-link-arrow inline-flex w-max items-center gap-1 text-sm font-semibold text-brand transition-colors hover:text-brand-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring"
    >
      상세보기
      <ArrowUpRight size={14} aria-hidden="true" />
    </Link>
  );
}

export default function ProjectsSection() {
  const ref = useScrollReveal<HTMLDivElement>();

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
        <div className="space-y-5">
          {PROJECTS_MOCK.map((project) => {
            const visibleTechStack = project.techStack.slice(0, VISIBLE_TECH_COUNT);
            const hiddenTechCount = project.techStack.length - visibleTechStack.length;

            return (
              <SurfaceCard
                as="article"
                key={project.projectKey}
                className="motion-card scroll-reveal scroll-mt-24 rounded-card border border-line-soft bg-surface-glass p-6 shadow-card hover:border-brand-ring hover:bg-surface hover:shadow-soft md:scroll-mt-32 md:p-7"
              >
                <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink-muted">
                      {project.displayLabel}
                    </p>

                    <h4 className="mt-2 text-2xl font-bold text-navy md:text-[28px]">
                      <Link
                        href={`/projects/${project.projectKey}`}
                        className="transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring"
                      >
                        {project.name}
                      </Link>
                    </h4>

                    <p className="mt-3 max-w-2xl break-keep text-[15px] leading-7 text-ink">
                      {project.summary}
                    </p>
                  </div>

                  <ProjectDetailLink projectKey={project.projectKey} />
                </div>

                <div className="mt-5 flex flex-col gap-4 border-t border-line-soft pt-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex min-w-0 flex-wrap gap-2">
                    {visibleTechStack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}

                    {hiddenTechCount > 0 && <Badge>+{hiddenTechCount}</Badge>}
                  </div>

                  {project.links.length > 0 && (
                    <div className="flex flex-wrap items-center gap-3">
                      {project.links.map((link) => (
                        <a
                          key={`${link.label}-${link.href}`}
                          href={link.href}
                          className="text-sm font-semibold text-ink-muted transition-colors hover:text-brand"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </SurfaceCard>
            );
          })}
        </div>
      </SectionLayout>
    </div>
  );
}