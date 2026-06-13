'use client';

import { Building2 } from 'lucide-react';
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
          <SectionHeading eyebrow="EXPERIENCE">
            데이터의 품질이 <br className="hidden md:block" />
            로직을 결정합니다.
          </SectionHeading>
        }
      >
        <article className="scroll-reveal reveal-delay-1 max-w-3xl">
          <SurfaceCard className="rounded-card border-line-soft bg-surface-glass p-6 md:p-7">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-4 border-b border-line-soft pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-panel bg-brand-pale text-brand">
                    <Building2 size={22} aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-brand">Experience</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy sm:text-xl">HiveLab</h4>
                    <p className="mt-2 break-keep text-[15px] font-medium text-ink-muted">
                      AI 학습 데이터 검수 및 관리
                    </p>
                  </div>
                </div>

                <p className="text-[13px] font-semibold text-ink-faint sm:pt-1">
                  2020.09 - 현재
                </p>
              </div>

              <div className="rounded-panel border border-line-soft bg-surface-soft p-5">
                <p className="break-keep text-[15px] font-medium leading-relaxed text-ink">
                  &quot;수만 건의 AI 학습 데이터를 검수하며 체득한 &apos;데이터 일관성&apos;의 감각을,
                  프론트엔드 상태 관리와 예외 흐름(Edge Case) 방어 로직에 적용하고 있습니다.&quot;
                </p>
              </div>

              <ul className="space-y-4">
                {EXPERIENCE_ITEMS.map(({ label, text }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="mt-1 shrink-0 text-brand" aria-hidden="true">
                      ✦
                    </span>
                    <p className="break-keep text-[15px] leading-relaxed text-ink">
                      <strong className="text-navy">{label}</strong> {text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </SurfaceCard>
        </article>
      </SectionLayout>
    </div>
  );
}
