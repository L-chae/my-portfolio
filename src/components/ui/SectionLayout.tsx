import React from 'react';

interface SectionLayoutProps {
  id: string;
  aside: React.ReactNode;
  children: React.ReactNode;
}

export function SectionLayout({ id, aside, children }: SectionLayoutProps) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-16 md:py-32">
      <div className="flex flex-col items-start gap-8 xl:flex-row xl:gap-16">
        <aside className="scroll-reveal reveal-soft-right w-full shrink-0 self-start xl:w-56">
          {aside}
        </aside>

        <div className="w-full min-w-0 xl:max-w-3xl xl:flex-1">
          {children}
        </div>
      </div>
    </section>
  );
}