import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  children: ReactNode;
}

export function SectionHeading({ eyebrow, children }: SectionHeadingProps) {
  return (
    <>
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 md:mb-4">
        {eyebrow}
      </h2>
      <h3 className="text-3xl font-extrabold leading-tight text-slate-900 break-keep md:text-2xl">
        {children}
      </h3>
    </>
  );
}
