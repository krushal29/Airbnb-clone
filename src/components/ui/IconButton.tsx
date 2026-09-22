import React from 'react';

export type IconButtonVariant = 'default' | 'ghost' | 'outline' | 'filled';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  'aria-label': ariaLabel,
  icon,
  variant = 'default',
  size = 'md',
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-full transition cursor-pointer select-none active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900';

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base',
  }[size];

  const variantClasses = {
    default:
      'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200',
    ghost:
      'text-neutral-700 hover:bg-transparent opacity-80 hover:opacity-100',
    outline:
      'border border-neutral-300 text-neutral-800 hover:bg-neutral-50 active:bg-neutral-100',
    filled:
      'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 active:bg-neutral-300',
  }[variant];

  return (
    <button
      aria-label={ariaLabel}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {icon}
    </button>
  );
};
