import type { HTMLAttributes } from 'react';

type BadgeTone = 'neutral' | 'accent' | 'muted';

const toneClass: Record<BadgeTone, string> = {
  neutral: 'border-line bg-surface-soft text-ink-muted',
  accent: 'border-accent-soft bg-accent-soft text-accent',
  muted: 'border-transparent bg-transparent text-ink-faint',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ tone = 'neutral', className = '', ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium ${toneClass[tone]} ${className}`}
      {...props}
    />
  );
}
