'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, GitBranch } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionLayout } from './ui/SectionLayout';
import { SectionHeading } from './ui/SectionHeading';
import { SurfaceCard } from './ui/SurfaceCard';
import { PROJECTS_MOCK } from '../content/projectsMock';

const FEATURED_TECH_COUNT = 4;

function getProjectLinkIcon(label: string, href: string) {
  const normalizedLabel = label.toLowerCase();
  const normalizedHref = href.toLowerCase();

  if (normalizedLabel.includes('github') || normalizedHref.includes('github.com')) {
    return GitBranch;
  }

  return ExternalLink;
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function getProjectLogoSrc(projectKey: string) {
  switch (projectKey) {
    case 'storylex':
      return '/projects/storylex-logo.png';
    case 'rodia':
      return '/projects/rodia-logo.png';
    case 'portfolio-ai':
      return '/projects/ai-logo.png';
    default:
      return '/projects/ai-logo.png';
  }
}

function ProjectDetailLink({ projectKey }: { projectKey: string }) {
  return (
    <Link
      href={`/projects/${projectKey}`}
      scroll={false}
      className="motion-link-arrow inline-flex w-max shrink-0 items-center gap-2 rounded-pill border border-line-soft bg-surface-soft px-3 py-2 whitespace-nowrap text-sm font-semibold text-brand transition-colors hover:border-brand-ring hover:text-brand-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring"
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
        <div className="w-full max-w-3xl space-y-5">
          {PROJECTS_MOCK.map((project, index) => {
            const revealDelayClass =
              index === 0 ? '' : index === 1 ? 'reveal-delay-1' : 'reveal-delay-2';
            const featuredTechStack = project.techStack.slice(0, FEATURED_TECH_COUNT);
            const hiddenTechCount = Math.max(0, project.techStack.length - featuredTechStack.length);

            return (
              <SurfaceCard
                as="article"
                key={project.projectKey}
                className={`motion-card scroll-reveal w-full ${revealDelayClass} rounded-card border border-line-soft bg-surface-glass p-6 shadow-card hover:border-brand-ring hover:bg-surface hover:shadow-soft md:p-7`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface">
                      <Image
                        src={getProjectLogoSrc(project.projectKey)}
                        alt={`${project.name} 로고`}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <h4 className="min-w-0 text-2xl font-bold text-navy md:text-3xl">
                      <Link
                        href={`/projects/${project.projectKey}`}
                        scroll={false}
                        className="transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring"
                      >
                        {project.name}
                      </Link>
                    </h4>
                  </div>

                  <div className="shrink-0">
                    <ProjectDetailLink projectKey={project.projectKey} />
                  </div>
                </div>

                <div className="mt-3 min-w-0 space-y-2">
                  <p className="text-sm font-medium text-ink-muted">{project.displayLabel}</p>
                  <p className="break-keep text-base leading-7 text-ink">{project.summary}</p>
                </div>

                <div className="mt-6 border-t border-line-soft pt-4">
                  <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-start md:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
                        Stack
                      </p>
                      <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
                        {featuredTechStack.map((tech, techIndex) => (
                          <span key={tech} className="inline-flex items-center gap-2">
                            {techIndex > 0 && (
                              <span aria-hidden="true" className="text-ink-faint">
                                ·
                              </span>
                            )}
                            <span>{tech}</span>
                          </span>
                        ))}

                        {hiddenTechCount > 0 && (
                          <span className="inline-flex items-center gap-2">
                            {featuredTechStack.length > 0 && (
                              <span aria-hidden="true" className="text-ink-faint">
                                ·
                              </span>
                            )}
                            <span>+{hiddenTechCount}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {project.links.length > 0 && (
                      <div className="flex shrink-0 flex-wrap items-center gap-3 md:justify-end">
                        {project.links.map((link) => {
                          const LinkIcon = getProjectLinkIcon(link.label, link.href);
                          const externalLinkProps = isExternalHref(link.href)
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {};

                          return (
                            <a
                              key={`${link.label}-${link.href}`}
                              href={link.href}
                              className="motion-link-arrow inline-flex items-center gap-2 rounded-pill border border-line-soft bg-surface px-3 py-2 text-sm font-semibold text-ink-muted transition-colors hover:border-brand-ring hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring"
                              {...externalLinkProps}
                            >
                              <LinkIcon size={14} aria-hidden="true" />
                              {link.label}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </SurfaceCard>
            );
          })}
        </div>
      </SectionLayout>
    </div>
  );
}
