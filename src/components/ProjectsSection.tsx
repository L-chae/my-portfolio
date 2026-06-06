'use client';

import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionLayout } from './SectionLayout';

interface ProjectCard {
  title: string;
  body: string;
}

interface Project {
  badge: { text: string; color: string };
  title: string;
  subtitle: string;
  cards: ProjectCard[];
}

const PROJECTS: Project[] = [
  {
    badge: { text: 'WEB APP', color: 'text-emerald-600 bg-emerald-50' },
    title: 'StoryLex',
    subtitle: '학습 흐름이 끊기지 않는 영어 학습 서비스',
    cards: [
      {
        title: '401 동시성 제어 (Promise Queue)',
        body: '토큰 만료 시 다중 API 호출로 인한 상태 불일치를 막기 위해, 첫 실패 요청 시 Queue를 활용한 일괄 재요청 아키텍처 구현.',
      },
      {
        title: 'Zustand와 React Query 책임 분리',
        body: '서버 데이터 캐싱(React Query)과 클라이언트 UI 상태(Zustand)의 책임을 명확히 나누어 컴포넌트 복잡도 통제.',
      },
    ],
  },
  {
    badge: { text: 'CROSS-PLATFORM', color: 'text-indigo-600 bg-indigo-50' },
    title: 'Rodia',
    subtitle: '디자인 자산 통합 및 모노레포 구축',
    cards: [
      {
        title: 'Feature API (Mapper) 계층 분리',
        body: '서버 응답 변경 시 발생하는 화면 단의 수정 비용을 Mapper 계층 한 곳으로 격리하여 결합도 축소 및 유지보수성 확보.',
      },
      {
        title: '런타임 에러 사전 차단',
        body: 'JSON 포맷과 Zod를 활용한 토큰 동기화 및 Orval을 통한 API 훅 자동 생성으로 휴먼 에러 원천 차단.',
      },
    ],
  },
  {
    badge: { text: 'AI ENGINEERING', color: 'text-orange-600 bg-orange-50' },
    title: 'Portfolio AI',
    subtitle: '대화형 이력서 에이전트',
    cards: [
      {
        title: '적정 기술 도입 및 데이터 구조화',
        body: "불필요한 RAG 오버엔지니어링을 피하고, '문제-해결-트레이드오프'로 규격화된 정적 데이터(SSOT) 주입 방식을 채택하여 환각(Hallucination) 제어.",
      },
    ],
  },
];

export function ProjectsSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <SectionLayout
        id="projects"
        aside={
          <>
            <h2 className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-3 md:mb-4">
              Featured Projects
            </h2>
            <h3 className="text-3xl md:text-2xl font-extrabold text-slate-900 leading-tight break-keep">
              아키텍처 설계와 <br className="hidden md:block" />
              트레이드오프.
            </h3>
          </>
        }
      >
        <div className="space-y-20">
          {PROJECTS.map(({ badge, title, subtitle, cards }) => (
            <article key={title} className="scroll-reveal">
              <div className="flex flex-col gap-2 mb-6 md:mb-8">
                <span className={`text-[11px] font-bold tracking-wider w-max px-3 py-1.5 rounded-lg ${badge.color}`}>
                  {badge.text}
                </span>
                <h4 className="text-3xl md:text-2xl font-extrabold text-slate-900 mt-2">
                  {title}
                </h4>
                <p className="text-[16px] md:text-[15px] text-slate-500 break-keep">{subtitle}</p>
              </div>
              <div className="space-y-4 md:space-y-6">
                {cards.map((card) => (
                  <div
                    key={card.title}
                    className="p-6 md:p-8 rounded-3xl border border-slate-200/60 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h5 className="text-[16px] md:text-[15px] font-bold text-slate-900 mb-3 md:mb-2 break-keep">
                      {card.title}
                    </h5>
                    <p className="text-[15px] md:text-[14px] text-slate-600 leading-relaxed break-keep">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SectionLayout>
    </div>
  );
}
