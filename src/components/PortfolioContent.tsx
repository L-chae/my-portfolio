'use client';

import { useEffect, useRef } from 'react';
import { Shield, Database, TerminalSquare } from 'lucide-react';

// ─── 파일 스코프 상수 ──────────────────────────────────────────────────────────

const CORE_VALUES = [
  {
    icon: <Shield size={22} />,
    title: '시나리오 검증가',
    description:
      '사용자는 100번의 정상 동작보다 1번의 실패 경험을 더 오래 기억합니다. 해피 패스(Happy Path) 구현보다 네트워크 지연, 인증 만료 등 실패 흐름(Failure Flow)을 선제적으로 방어합니다.',
  },
  {
    icon: <Database size={22} />,
    title: '반복 비용의 시스템적 제거',
    description:
      '휴먼 에러를 유발하는 반복 업무를 방치하지 않습니다. OpenAPI 기반 코드 생성기나 Zod를 활용해 런타임 에러를 빌드 타임으로 끌어올려 팀의 생산성을 높입니다.',
  },
  {
    icon: <TerminalSquare size={22} />,
    title: '적정 기술과 오버엔지니어링 경계',
    description:
      "미래의 확장성을 과도하게 고려하다 발생한 실패 경험을 바탕으로, 현재 팀 규모와 비즈니스 우선순위에 맞춰 가장 적합한 '적정 수준의 타협점'을 도출합니다.",
  },
];

const PROJECTS = [
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

// ─── SectionLayout: 파일 스코프로 선언 (render 내부 선언 금지) ─────────────────

interface SectionLayoutProps {
  id: string;
  aside: React.ReactNode;
  children: React.ReactNode;
}

function SectionLayout({ id, aside, children }: SectionLayoutProps) {
  return (
    <section
      id={id}
      className="py-16 md:py-32 max-w-5xl mx-auto px-6 border-t border-slate-200/50"
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-start">
        {/*
          sticky 동작 전제:
          1. self-start — flex item이 콘텐츠 높이만큼만 차지해야 sticky 작동
          2. 부모 체인에 overflow: hidden/clip 없어야 함
        */}
        <aside className="scroll-reveal md:w-1/3 shrink-0 self-start md:sticky md:top-32">
          {aside}
        </aside>
        <div className="md:w-2/3 w-full">{children}</div>
      </div>
    </section>
  );
}

// ─── 메인 컴포넌트 ─────────────────────────────────────────────────────────────

export default function PortfolioContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>('.scroll-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0 }
    );

    // 마운트 시점에 이미 뷰포트 안에 있는 요소는 즉시 visible 처리
    // → opacity:0 깜빡임 원천 차단
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (inViewport) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 400ms ease-out, transform 400ms ease-out;
        }
        .scroll-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      <div ref={containerRef} className="w-full bg-transparent">

        {/* ── 1. Experience ───────────────────────────────────────────────── */}
        <SectionLayout
          id="experience"
          aside={
            <>
              <h2 className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-3 md:mb-4">
                Experience
              </h2>
              <h3 className="text-3xl md:text-2xl font-extrabold text-slate-900 leading-tight break-keep">
                데이터의 품질이 <br className="hidden md:block" />
                로직을 결정합니다.
              </h3>
            </>
          }
        >
          <article className="scroll-reveal space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 pb-6 border-b border-slate-200/60">
              <h4 className="text-2xl sm:text-xl font-bold text-slate-900">HiveLab</h4>
              <span className="text-[15px] sm:text-sm font-medium text-slate-500 break-keep">
                AI 학습 데이터 검수 및 관리
              </span>
              <span className="text-[13px] font-semibold text-slate-400 sm:ml-auto mt-2 sm:mt-0">
                2020.09 - 현재
              </span>
            </div>

            <div className="p-6 md:p-8 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[15px] font-medium text-slate-700 leading-relaxed break-keep">
                &quot;수만 건의 AI 학습 데이터를 검수하며 체득한 &apos;데이터 일관성&apos;의 감각을,
                프론트엔드 상태 관리와 예외 흐름(Edge Case) 방어 로직에 적용하고 있습니다.&quot;
              </p>
            </div>

            <ul className="space-y-5 pt-2">
              {[
                {
                  label: '데이터 품질 기반의 예외 처리:',
                  text: '양보다 품질이 중요하다는 검수 경험을 바탕으로, 서버 데이터 신뢰도 저하를 대비한 Error Boundary 설계.',
                },
                {
                  label: '반복 비용 제거:',
                  text: '휴먼 에러를 유발하는 수동 작업 환경을 단축 도구로 최적화했던 경험을 현재의 코드 생성기 도입 등 시스템 자동화 시각으로 연결.',
                },
              ].map(({ label, text }) => (
                <li key={label} className="flex gap-4 items-start">
                  <span className="text-blue-500 mt-1 shrink-0" aria-hidden="true">✦</span>
                  <p className="text-[15px] md:text-[14px] text-slate-600 leading-relaxed break-keep">
                    <strong className="text-slate-900">{label}</strong> {text}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </SectionLayout>

        {/* ── 2. Core Values ──────────────────────────────────────────────── */}
        <SectionLayout
          id="core-values"
          aside={
            <>
              <h2 className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-3 md:mb-4">
                Core Values
              </h2>
              <h3 className="text-3xl md:text-2xl font-extrabold text-slate-900 leading-tight break-keep">
                기능 구현보다 <br className="hidden md:block" />
                유지보수 비용을 <br className="hidden md:block" />
                고민합니다.
              </h3>
            </>
          }
        >
          <div className="space-y-12 md:space-y-16">
            {CORE_VALUES.map(({ icon, title, description }) => (
              <article key={title} className="scroll-reveal">
                <div className="w-12 h-12 bg-white border border-slate-200/60 shadow-sm rounded-2xl flex items-center justify-center mb-5 md:mb-6 text-blue-600">
                  {icon}
                </div>
                <h4 className="text-xl md:text-lg font-bold text-slate-900 mb-3 break-keep">
                  {title}
                </h4>
                <p className="text-[15px] text-slate-600 leading-relaxed break-keep">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </SectionLayout>

        {/* ── 3. Featured Projects ────────────────────────────────────────── */}
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
                  <span
                    className={`text-[11px] font-bold tracking-wider w-max px-3 py-1.5 rounded-lg ${badge.color}`}
                  >
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
    </>
  );
}