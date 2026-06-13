import React from 'react';

interface SectionLayoutProps {
  id: string;
  aside: React.ReactNode;
  children: React.ReactNode;
}

export function SectionLayout({ id, aside, children }: SectionLayoutProps) {
  return (
    <section
      id={id}
      className="max-w-5xl px-6 py-16 md:py-32 mx-auto"
    >
      <div className="flex flex-col items-start gap-8 xl:flex-row xl:gap-24">
        <aside className="scroll-reveal reveal-soft-right w-full shrink-0 self-start xl:w-1/3">
          {aside}
        </aside>
        <div className="w-full xl:w-2/3">{children}</div>
      </div>
    </section>
  );
}
