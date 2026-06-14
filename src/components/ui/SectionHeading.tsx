import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  children: ReactNode;
}

export function SectionHeading({ eyebrow, children }: SectionHeadingProps) {
  return (
    <>
      <h2 className="mb-3 text-2xl font-bold uppercase leading-tight text-brand md:mb-4 md:text-3xl">
        {eyebrow}
      </h2>
      <h3 className="text-xl font-semibold leading-8 text-navy break-keep md:text-2xl">
        {children}
      </h3>
    </>
  );
}
