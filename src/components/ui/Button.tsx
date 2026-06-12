import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type ButtonSize = 'sm' | 'md' | 'icon';

const baseClass =
  'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-ink-faint disabled:shadow-none disabled:hover:bg-surface-muted';

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white shadow-brand hover:bg-brand-hover',
  secondary:
    'border border-line bg-surface text-navy hover:bg-surface-soft',
  ghost:
    'text-ink-muted hover:text-navy',
  inverse:
    'bg-white text-navy shadow-sm hover:bg-accent-pale focus-visible:ring-white/25',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-xs',
  icon: 'h-9 w-9 p-0',
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={joinClasses(baseClass, variantClass[variant], sizeClass[size], className)}
      {...props}
    />
  );
}

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function LinkButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={joinClasses(baseClass, variantClass[variant], sizeClass[size], className)}
    >
      {children}
    </Link>
  );
}
