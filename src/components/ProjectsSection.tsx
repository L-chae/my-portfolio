'use client';

import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionLayout } from './ui/SectionLayout';

interface Project {
  projectKey: string;
  label: string;
  name: string;
  summary: string;
  problem: string;
  solution: string;
  technicalDecision: string;
  tradeOff: string;
  techStack: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    projectKey: 'storylex',
    label: 'WEB APP',
    name: 'StoryLex',
    summary: '학습 흐름이 끊기지 않는 영어 학습 서비스',
    problem: '동시 401 응답으로 인증 재시도와 사용자 상태가 어긋나는 문제가 있었습니다.',
    solution: 'Promise Queue로 토큰 재발급과 실패 요청 재시도를 한 번에 제어했습니다.',
    technicalDecision: 'React Query는 서버 상태, Zustand는 사용자 제어 상태로 분리했습니다.',
    tradeOff: '큐 관리 비용은 늘었지만, 동시성 상황의 데이터 검증 흐름이 안정화됐습니다.',
    techStack: ['React', 'TypeScript', 'React Query', 'Zustand', 'Promise Queue'],
    links: [],
    featured: true,
  },
  {
    projectKey: 'rodia',
    label: 'MOBILE APP',
    name: 'Rodia',
    summary: 'React Native 기반 모바일 앱과 디자인 자산 통합 경험',
    problem: 'API 응답 변경과 화면 전환 흐름이 맞물려 화면 수정 비용이 커졌습니다.',
    solution: 'Feature API와 Mapper 계층을 분리해 서버 응답 변경 영향을 격리했습니다.',
    technicalDecision: '화면 로직과 API 응답 매핑을 분리하고 Zod/Orval로 포맷 검증을 보강했습니다.',
    tradeOff: '초기 구조화 비용은 늘었지만 반복 수정 비용과 런타임 오류 가능성을 줄였습니다.',
    techStack: ['React Native', 'TypeScript', 'Mapper', 'Zod', 'Orval'],
    links: [],
  },
  {
    projectKey: 'portfolio-ai',
    label: 'AI INTERFACE',
    name: 'Portfolio AI',
    summary: '포트폴리오 데이터셋 기반 질의응답 인터페이스',
    problem: '일반 포트폴리오는 방문자가 원하는 맥락을 직접 탐색하기 어렵습니다.',
    solution: '문제-해결-트레이드오프 기반 데이터셋으로 답변 범위를 통제했습니다.',
    technicalDecision: '프로젝트별 context 질문과 추천 질문을 연결해 탐색 흐름을 설계했습니다.',
    tradeOff: '범용성은 줄였지만 포트폴리오 목적에 맞는 신뢰도와 일관성을 우선했습니다.',
    techStack: ['Next.js', 'AI SDK', 'TypeScript', 'Zustand', 'Structured Dataset'],
    links: [],
  },
];

export default function ProjectsSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <SectionLayout
        id="projects"
        aside={
          <>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 md:mb-4">
              Projects
            </h2>
            <h3 className="text-3xl font-extrabold leading-tight text-slate-900 break-keep md:text-2xl">
              문제를 정의하고 <br className="hidden md:block" />
              흐름을 개선합니다.
            </h3>
          </>
        }
      >
        <div className="space-y-6">
          {PROJECTS.map((project) => (
            <article
              key={project.projectKey}
              className="scroll-reveal scroll-mt-24 snap-start rounded-3xl border border-slate-200/60 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md md:scroll-mt-32 md:p-8"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
                      {project.label}
                    </span>

                    {project.featured && (
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        / Featured
                      </span>
                    )}
                  </div>

                  <h4 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-[28px]">
                    {project.name}
                  </h4>

                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600 break-keep">
                    {project.summary}
                  </p>
                </div>

                <button
                  type="button"
                  data-project={project.projectKey}
                  className="inline-flex w-max shrink-0 items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-600/10 transition-colors hover:bg-blue-700"
                >
                  AI에게 질문
                  <span aria-hidden="true">↗</span>
                </button>
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200/60 bg-white/55 p-5 md:p-6">
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
              </div>

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

                {project.links.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3">
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
                )}
              </div>
            </article>
          ))}
        </div>
      </SectionLayout>
    </div>
  );
}
