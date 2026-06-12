import type { HTMLAttributes } from 'react';

type BadgeTone = 'neutral' | 'accent' | 'muted';

const toneClass: Record<BadgeTone, string> = {
  neutral: 'border-slate-200 bg-white/70 text-slate-500',
  accent: 'border-blue-100 bg-blue-50/70 text-blue-700',
  muted: 'border-transparent bg-transparent text-slate-400',
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
