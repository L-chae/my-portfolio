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
      <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-start">
        <aside className="scroll-reveal md:w-1/3 shrink-0 self-start">
          {aside}
        </aside>
        <div className="md:w-2/3 w-full">{children}</div>
      </div>
    </section>
  );
}
