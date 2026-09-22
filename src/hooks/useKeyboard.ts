import { useEffect } from 'react';

interface KeyHandlers {
  onEscape?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onSpace?: () => void;
}

export function useKeyboard(handlers: KeyHandlers, active = true) {
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && handlers.onEscape) {
        e.preventDefault();
        handlers.onEscape();
      } else if (e.key === 'ArrowLeft' && handlers.onArrowLeft) {
        e.preventDefault();
        handlers.onArrowLeft();
      } else if (e.key === 'ArrowRight' && handlers.onArrowRight) {
        e.preventDefault();
        handlers.onArrowRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers, active]);
}
