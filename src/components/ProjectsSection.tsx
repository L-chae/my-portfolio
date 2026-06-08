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
    problem:
      '토큰 만료 시 여러 API 요청이 동시에 401 응답을 받으며 사용자 제어 흐름과 데이터 상태가 어긋날 수 있었습니다.',
    solution:
      '첫 실패 요청을 기준으로 Promise Queue를 구성해 재발급과 재요청을 일괄 처리하고, 실패 흐름에서도 학습 맥락이 끊기지 않도록 설계했습니다.',
    technicalDecision:
      '서버 데이터 캐싱은 React Query가 맡고, 클라이언트 UI 상태는 Zustand가 맡도록 책임을 분리해 컴포넌트 복잡도를 통제했습니다.',
    tradeOff:
      '인증 흐름을 단순 인터셉터로만 처리하는 대신 큐 관리 비용을 감수했고, 그 대가로 동시성 상황에서 데이터 검증과 사용자 제어를 안정화했습니다.',
    techStack: ['React', 'TypeScript', 'React Query', 'Zustand', 'Promise Queue'],
    links: [],
    featured: true,
  },
  {
    projectKey: 'rodia',
    label: 'MOBILE APP',
    name: 'Rodia',
    summary: 'React Native 기반 모바일 앱과 디자인 자산 통합 경험',
    problem:
      'API 응답 변경과 화면 전환 흐름이 맞물리며 화면 단 수정 비용이 커지고, 모바일 사용 흐름에서 체감 성능 관리가 필요했습니다.',
    solution:
      'Feature API와 Mapper 계층을 분리해 서버 응답 변경의 영향을 한 곳으로 격리하고, 화면 전환과 데이터 흐름을 더 예측 가능하게 정리했습니다.',
    technicalDecision:
      'React Native 환경에서 API 응답 흐름을 화면 로직과 분리하고, JSON 포맷 검증과 생성 도구를 활용해 런타임 에러 가능성을 줄였습니다.',
    tradeOff:
      '초기 구조화 비용은 늘었지만, 반복되는 응답 매핑과 화면 수정 비용을 낮춰 모바일 앱의 유지보수성과 최적화 여지를 확보했습니다.',
    techStack: ['React Native', 'TypeScript', 'Mapper', 'Zod', 'Orval'],
    links: [],
  },
  {
    projectKey: 'portfolio-ai',
    label: 'AI INTERFACE',
    name: 'Portfolio AI',
    summary: '포트폴리오 데이터셋 기반 질의응답 인터페이스',
    problem:
      '일반적인 자기소개 페이지는 방문자가 원하는 맥락을 직접 탐색하기 어렵고, AI 답변은 데이터 근거가 약하면 환각 위험이 커집니다.',
    solution:
      "불필요한 RAG 오버엔지니어링을 피하고, '문제-해결-트레이드오프'로 규격화된 포트폴리오 데이터셋을 주입해 답변 범위를 통제했습니다.",
    technicalDecision:
      '프로젝트별 context 질문과 추천 질문을 연결해 방문자가 Rodia, StoryLex, Portfolio AI를 대화 흐름 안에서 탐색하도록 구성했습니다.',
    tradeOff:
      '범용 검색형 AI보다 답변 범위는 좁지만, 포트폴리오 탐색 목적에 맞춰 신뢰도와 UI/UX 일관성을 우선했습니다.',
    techStack: ['Next.js', 'AI SDK', 'TypeScript', 'Zustand', 'Structured Dataset'],
    links: [],
  },
];

const CASE_STUDY_ITEMS = [
  ['Problem', 'problem'],
  ['Solution', 'solution'],
  ['Technical Decision', 'technicalDecision'],
  ['Trade-off', 'tradeOff'],
] as const;

export default function ProjectsSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <SectionLayout
        id="projects"
        aside={
          <>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-3 md:mb-4">
              Featured Projects
            </h2>
            <h3 className="text-3xl md:text-2xl font-extrabold text-slate-900 leading-tight break-keep">
              문제를 정의하고 <br className="hidden md:block" />
              흐름을 개선한 작업들.
            </h3>
          </>
        }
      >
        <div className="space-y-8 md:space-y-10">
          {PROJECTS.map((project) => (
            <article
              key={project.projectKey}
              className={`scroll-reveal rounded-2xl bg-white/55 ring-1 ring-slate-900/5 ${
                project.featured ? 'ring-slate-900/10' : ''
              }`}
            >
              <div className="px-6 py-7 md:px-8 md:py-9">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-3">
                    <span className="inline-flex w-max rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-900/5">
                      {project.label}
                    </span>
                    <div>
                      <h4 className="text-2xl font-extrabold text-slate-950 md:text-3xl">
                        {project.name}
                      </h4>
                      <p className="mt-2 text-[15px] leading-relaxed text-slate-500 break-keep">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  {project.featured && (
                    <span className="w-max rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                      Featured Case
                    </span>
                  )}
                </div>

                <div className="mt-7 grid gap-5 border-y border-slate-200/70 py-6 md:grid-cols-2">
                  {CASE_STUDY_ITEMS.map(([label, key]) => (
                    <section key={key} className="space-y-2">
                      <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        {label}
                      </h5>
                      <p className="text-[14px] leading-7 text-slate-700 break-keep">
                        {project[key]}
                      </p>
                    </section>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-5">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-900/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 transition-colors hover:ring-slate-900/20"
                      >
                        {link.label}
                      </a>
                    ))}
                    <button
                      type="button"
                      data-project={project.projectKey}
                      className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 transition-colors hover:ring-slate-900/20"
                    >
                      이 프로젝트 AI에게 질문하기
                    </button>
                    {/* TODO: ChatBar context 연결 시 data-project 값을 사용합니다. */}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionLayout>
    </div>
  );
}
