'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Badge } from './ui/Badge';
import { LinkButton } from './ui/Button';
import { SectionLayout } from './ui/SectionLayout';
import { SectionHeading } from './ui/SectionHeading';
import { SurfaceCard } from './ui/SurfaceCard';
import { PROJECTS_MOCK } from '../content/projectsMock';

export default function ProjectsSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <SectionLayout
        id="projects"
        aside={
          <SectionHeading eyebrow="Projects">
            문제를 정의하고 <br className="hidden md:block" />
            흐름을 개선합니다.
          </SectionHeading>
        }
      >
        <div className="space-y-6">
          {PROJECTS_MOCK.map((project) => (
            <SurfaceCard
              as="article"
              key={project.projectKey}
              className="scroll-reveal scroll-mt-24 rounded-3xl bg-white/60 p-6 transition-shadow hover:shadow-md md:scroll-mt-32 md:p-8"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-slate-500">
                      {project.displayLabel}
                    </span>

                    {project.featured && (
                      <Badge tone="accent" className="px-2.5 py-1">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <h4 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-[28px]">
                    <Link
                      href={`/projects/${project.projectKey}`}
                      className="transition-colors hover:text-slate-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/15"
                    >
                      {project.name}
                    </Link>
                  </h4>

                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600 break-keep">
                    {project.summary}
                  </p>
                </div>

              </div>

              <SurfaceCard className="mt-6 rounded-3xl bg-white/55 p-5 md:p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <section>
                    <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Problem
                    </h5>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-700 break-keep">
                      {project.problem}
                    </p>
                  </section>

                  <section>
                    <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Solution
                    </h5>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-700 break-keep">
                      {project.solution}
                    </p>
                  </section>
                </div>
              </SurfaceCard>

              <ul className="mt-5 space-y-4">
                <li className="flex items-start gap-4">
                  <span className="mt-1 shrink-0 text-blue-500" aria-hidden="true">
                    ✦
                  </span>
                  <p className="text-[15px] leading-relaxed text-slate-600 break-keep md:text-[14px]">
                    <strong className="text-slate-900">Technical Decision:</strong>{' '}
                    {project.technicalDecision}
                  </p>
                </li>

                <li className="flex items-start gap-4">
                  <span className="mt-1 shrink-0 text-blue-500" aria-hidden="true">
                    ✦
                  </span>
                  <p className="text-[15px] leading-relaxed text-slate-600 break-keep md:text-[14px]">
                    <strong className="text-slate-900">Trade-off:</strong>{' '}
                    {project.tradeOff}
                  </p>
                </li>
              </ul>

              <div className="mt-6 flex flex-col gap-4 border-t border-slate-200/60 pt-5 md:flex-row md:items-center md:justify-between">
                <p className="text-xs font-medium leading-6 text-slate-500">
                  {project.techStack.map((tech, index) => (
                    <span key={tech}>
                      {tech}
                      {index < project.techStack.length - 1 && (
                        <span className="mx-2 text-slate-300">•</span>
                      )}
                    </span>
                  ))}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <LinkButton
                    href={`/projects/${project.projectKey}`}
                    variant="primary"
                  >
                    상세보기
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </LinkButton>

                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </SectionLayout>
    </div>
  );
}
