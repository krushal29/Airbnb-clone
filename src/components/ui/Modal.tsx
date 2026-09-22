import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

export type ModalMaxWidth =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | 'full';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: ModalMaxWidth;
  showHeader?: boolean;
  showCloseButton?: boolean;
  headerRight?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  'aria-label'?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '2xl',
  showHeader = true,
  showCloseButton = true,
  headerRight,
  className = '',
  contentClassName = '',
  'aria-label': ariaLabel,
}) => {
  useBodyScrollLock(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    full: 'max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]',
  }[maxWidth];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel || title || 'Dialog'}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`bg-white rounded-3xl w-full ${maxWidthClasses} max-h-[88vh] flex flex-col shadow-2xl relative overflow-hidden z-10 ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {showHeader && (
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between shrink-0">
                {showCloseButton ? (
                  <button
                    onClick={onClose}
                    className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition cursor-pointer text-neutral-800"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="w-9" />
                )}

                {title && (
                  <div className="font-bold text-base text-neutral-900 text-center truncate px-4">
                    {title}
                  </div>
                )}

                <div className="flex items-center justify-end min-w-9">
                  {headerRight || <div className="w-9" />}
                </div>
              </div>
            )}

            {/* Modal Body */}
            <div className={`flex-1 overflow-y-auto ${contentClassName}`}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
