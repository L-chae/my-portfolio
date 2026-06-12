'use client';

import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionLayout } from './ui/SectionLayout';
import { SectionHeading } from './ui/SectionHeading';
import { SurfaceCard } from './ui/SurfaceCard';

const EXPERIENCE_ITEMS = [
  {
    label: '데이터 품질 기반의 예외 처리:',
    text: '양보다 품질이 중요하다는 검수 경험을 바탕으로, 서버 데이터 신뢰도 저하를 대비한 Error Boundary 설계.',
  },
  {
    label: '반복 비용 제거:',
    text: '휴먼 에러를 유발하는 수동 작업 환경을 단축 도구로 최적화했던 경험을 현재의 코드 생성기 도입 등 시스템 자동화 시각으로 연결.',
  },
];

export default function ExperienceSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <SectionLayout
        id="experience"
        aside={
          <SectionHeading eyebrow="Experience">
            데이터의 품질이 <br className="hidden md:block" />
            로직을 결정합니다.
          </SectionHeading>
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

          <SurfaceCard className="rounded-3xl bg-white/60 p-6 transition-shadow hover:shadow-md md:p-8">
            <p className="text-[15px] font-medium text-slate-700 leading-relaxed break-keep">
              &quot;수만 건의 AI 학습 데이터를 검수하며 체득한 &apos;데이터 일관성&apos;의 감각을,
              프론트엔드 상태 관리와 예외 흐름(Edge Case) 방어 로직에 적용하고 있습니다.&quot;
            </p>
          </SurfaceCard>

          <ul className="space-y-5 pt-2">
            {EXPERIENCE_ITEMS.map(({ label, text }) => (
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
    </div>
  );
}
