'use client';

import { Building2 } from 'lucide-react';
import { career } from '../content/knowledge/career';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionLayout } from './ui/SectionLayout';
import { SectionHeading } from './ui/SectionHeading';
import { SurfaceCard } from './ui/SurfaceCard';

const EXPERIENCE_ITEMS = [
  {
    label: '디자인 데이터 정리:',
    text: 'PSD 내부 레이어와 UI 요소를 기준에 맞게 확인하고 정리했습니다.',
  },
  {
    label: '마크업 준비:',
    text: 'Figma 레이어 이름과 구조를 개발자가 이해하기 좋은 형태로 다듬었습니다.',
  },
];

export default function ExperienceSection() {
  const ref = useScrollReveal<HTMLDivElement>();
  const hivelab = career.hivelab;

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
                    <p className="text-sm font-semibold text-brand">{hivelab.uiText.label}</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy sm:text-xl">{hivelab.company}</h4>
                    <p className="mt-2 break-keep text-[15px] font-medium text-ink-muted">
                      {hivelab.uiText.title}
                    </p>
                  </div>
                </div>

                <p className="text-[13px] font-semibold text-ink-faint sm:pt-1">
                  {hivelab.uiText.period}
                </p>
              </div>

              <div className="rounded-panel border border-line-soft bg-surface-soft p-5">
                <p className="break-keep text-[15px] font-medium leading-relaxed text-ink">
                  &quot;{hivelab.uiText.description}&quot;
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
