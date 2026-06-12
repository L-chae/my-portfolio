import { createElement, type HTMLAttributes, type ReactNode } from 'react';

type SurfaceElement = 'div' | 'article' | 'section';

interface SurfaceCardProps extends HTMLAttributes<HTMLElement> {
  as?: SurfaceElement;
  children: ReactNode;
}

export function SurfaceCard({
  as = 'div',
  children,
  className = '',
  ...props
}: SurfaceCardProps) {
  return createElement(
    as,
    {
      className: `rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm backdrop-blur-sm ${className}`,
      ...props,
    },
    children
  );
}
