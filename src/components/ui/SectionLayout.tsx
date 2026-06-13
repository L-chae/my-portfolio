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
      className="scroll-mt-24 py-16 md:py-32 max-w-5xl mx-auto px-6"
    >
      <div className="flex flex-col gap-8 items-start xl:flex-row xl:gap-24">
        <aside className="scroll-reveal w-full shrink-0 self-start xl:w-1/3">
          {aside}
        </aside>
        <div className="w-full xl:w-2/3">{children}</div>
      </div>
    </section>
  );
}
