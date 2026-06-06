'use client';

import { Shield, Users, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useScrollReveal } from './useScrollReveal';
import { SectionLayout } from './SectionLayout';
import type { CoreValue } from '@/types/project';

// data.ts의 icon 문자열(FontAwesome id) → lucide 컴포넌트 매핑
// data.ts에서 icon 값을 바꾸면 여기만 수정하면 됨
const ICON_MAP: Record<string, LucideIcon> = {
  'fa-layer-group': Layers,
  'fa-shield-halved': Shield,
  'fa-users': Users,
};

const FALLBACK_ICON = Layers;

interface Props {
  coreValues: CoreValue[];
}

export function CoreValuesSection({ coreValues }: Props) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
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
          {coreValues.map(({ id, icon, title, description }) => {
            const Icon = ICON_MAP[icon] ?? FALLBACK_ICON;
            return (
              <article key={id} className="scroll-reveal">
                <div className="w-12 h-12 bg-white border border-slate-200/60 shadow-sm rounded-2xl flex items-center justify-center mb-5 md:mb-6 text-blue-600">
                  <Icon size={22} />
                </div>
                <h4 className="text-xl md:text-lg font-bold text-slate-900 mb-3 break-keep">
                  {title}
                </h4>
                <p className="text-[15px] text-slate-600 leading-relaxed break-keep">
                  {description}
                </p>
              </article>
            );
          })}
        </div>
      </SectionLayout>
    </div>
  );
}