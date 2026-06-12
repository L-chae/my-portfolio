import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type ButtonSize = 'sm' | 'md' | 'icon';

const baseClass =
  'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/15 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none disabled:hover:bg-slate-100';

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white shadow-sm shadow-blue-600/10 hover:bg-blue-700',
  secondary:
    'border border-slate-200 bg-white/75 text-slate-700 hover:bg-white hover:text-slate-950',
  ghost:
    'text-slate-500 hover:text-slate-950',
  inverse:
    'bg-white text-slate-950 shadow-sm hover:bg-slate-100 focus-visible:ring-white/25',
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
