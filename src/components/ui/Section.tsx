import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  borderTop?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  action,
  borderTop = true,
  children,
  className = '',
  ...props
}) => {
  return (
    <section
      id={id}
      className={`${borderTop ? 'border-t border-neutral-200' : ''} py-8 lg:py-10 ${className}`.trim()}
      {...props}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-6">
          <div>
            {title && (
              <h2 className="text-[22px] font-semibold text-neutral-900 leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-neutral-600 mt-1">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
};
