import * as React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'; // default 'primary'
  size?: 'sm' | 'md' | 'lg'; // default 'md'
  loading?: boolean; // default false
  loadingText?: React.ReactNode; // shown beside/for spinner when loading
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-gold text-white hover:bg-gold-dark',
  secondary: 'bg-transparent border border-navy text-navy hover:bg-navy/5',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

function cx(...parts: (string | boolean | undefined | null)[]): string {
  return parts.filter(Boolean).join(' ');
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      loadingText,
      type = 'button',
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) {
    const isDisabled = Boolean(disabled || loading);

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        {...props}
        aria-busy={loading ? 'true' : props['aria-busy']}
        className={cx(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
      >
        {loading && (
          <Loader2
            className="h-[1em] w-[1em] shrink-0 animate-spin"
            aria-hidden="true"
          />
        )}
        {loading && loadingText !== undefined ? loadingText : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
