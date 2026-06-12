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
      className: `rounded-2xl border border-line bg-surface/85 shadow-card backdrop-blur-sm ${className}`,
      ...props,
    },
    children
  );
}
