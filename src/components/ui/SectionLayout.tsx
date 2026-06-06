import React from 'react';

interface SectionLayoutProps {
  id: string;
  aside: React.ReactNode;
  children: React.ReactNode;
}

/**
 * 포트폴리오 공용 2-column 섹션 레이아웃
 *
 * sticky 동작 전제:
 * - aside에 self-start 적용 (flex item이 콘텐츠 높이만큼만 차지)
 * - 부모 체인에 overflow: hidden/clip 없어야 함
 */
export function SectionLayout({ id, aside, children }: SectionLayoutProps) {
  return (
    <section
      id={id}
      className="py-16 md:py-32 max-w-5xl mx-auto px-6 border-t border-slate-200/50"
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-start">
        <aside className="scroll-reveal md:w-1/3 shrink-0 self-start md:sticky md:top-32">
          {aside}
        </aside>
        <div className="md:w-2/3 w-full">{children}</div>
      </div>
    </section>
  );
}
