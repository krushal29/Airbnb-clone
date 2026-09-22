import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { ListingPhoto } from '../../types/listing';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface LightboxViewerProps {
  photos: ListingPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  onGridClick?: () => void;
  onShare?: () => void;
}

export const LightboxViewer: React.FC<LightboxViewerProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  onGridClick,
}) => {
  useBodyScrollLock(isOpen);
  const [direction, setDirection] = useState<number>(0);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus restoration & initial focus capture
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
      // Focus close button on open
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else if (triggerElementRef.current) {
      triggerElementRef.current.focus();
    }
  }, [isOpen]);

  // Focus trap & keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
          setDirection(-1);
          onNavigate(currentIndex - 1);
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentIndex < photos.length - 1) {
          setDirection(1);
          onNavigate(currentIndex + 1);
        }
      } else if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length, onClose, onNavigate]);

  if (!isOpen || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (hasPrev) {
      setDirection(-1);
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (hasNext) {
      setDirection(1);
      onNavigate(currentIndex + 1);
    }
  };

  // Determine title matching the reference: Category + index in category (e.g. "Living room 1")
  const getPhotoTitle = () => {
    if (!currentPhoto) return '';
    const category = currentPhoto.category || 'Photo';
    const photosInCat = photos.filter((p) => p.category === currentPhoto.category);
    const indexInCat = photosInCat.findIndex((p) => p.id === currentPhoto.id) + 1;
    return `${category} ${indexInCat > 0 ? indexInCat : 1}`;
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : dir < 0 ? -40 : 0,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-white flex flex-col justify-between select-none animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      {/* ── Top Header: 9-dot grid icon | Title ("Living room 1") | "1 of 43" & X ── */}
      <div className="w-full h-16 px-6 sm:px-10 flex items-center justify-between z-20 bg-white border-b border-neutral-100">
        {/* Left: 9-dots icon to return to all photos / grid */}
        <button
          type="button"
          onClick={onGridClick || onClose}
          className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition cursor-pointer text-neutral-800"
          aria-label="Back to photos"
          title="Back to photos"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" className="text-neutral-900">
            <circle cx="2.5" cy="2.5" r="1.5" />
            <circle cx="9" cy="2.5" r="1.5" />
            <circle cx="15.5" cy="2.5" r="1.5" />
            <circle cx="2.5" cy="9" r="1.5" />
            <circle cx="9" cy="9" r="1.5" />
            <circle cx="15.5" cy="9" r="1.5" />
            <circle cx="2.5" cy="15.5" r="1.5" />
            <circle cx="9" cy="15.5" r="1.5" />
            <circle cx="15.5" cy="15.5" r="1.5" />
          </svg>
        </button>

        {/* Center: Title (e.g. "Living room 1") */}
        <div className="text-sm md:text-base font-semibold text-neutral-900 truncate px-4">
          {getPhotoTitle()}
        </div>

        {/* Right: Counter + Close X */}
        <div className="flex items-center gap-4 text-sm font-normal text-neutral-800">
          <span aria-live="polite">
            {currentIndex + 1} of {photos.length}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-neutral-100 transition cursor-pointer text-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none"
            aria-label="Close photo viewer"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* ── Main Image Stage ── */}
      <div className="flex-1 relative flex items-center justify-between px-4 sm:px-10 overflow-hidden min-h-0">
        {/* Left Arrow Button */}
        {hasPrev ? (
          <button
            type="button"
            onClick={handlePrev}
            className="z-30 w-10 h-10 rounded-full bg-white border border-neutral-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-neutral-50 hover:scale-105 active:scale-95 flex items-center justify-center text-neutral-800 transition cursor-pointer shrink-0"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2] text-neutral-800" />
          </button>
        ) : (
          <div className="w-10 shrink-0" />
        )}

        {/* Center Photo Container */}
        <div className="flex-1 flex items-center justify-center px-4 h-full max-h-[82vh] overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={currentPhoto.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
              src={currentPhoto.url}
              alt={currentPhoto.alt || currentPhoto.caption}
              className="max-h-[80vh] max-w-full object-contain select-none"
            />
          </AnimatePresence>
        </div>

        {/* Right Arrow Button */}
        {hasNext ? (
          <button
            type="button"
            onClick={handleNext}
            className="z-30 w-10 h-10 rounded-full bg-white border border-neutral-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-neutral-50 hover:scale-105 active:scale-95 flex items-center justify-center text-neutral-800 transition cursor-pointer shrink-0"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5 stroke-[2] text-neutral-800" />
          </button>
        ) : (
          <div className="w-10 shrink-0" />
        )}
      </div>

      {/* ── Bottom spacer ── */}
      <div className="h-6 w-full shrink-0" />
    </div>
  );
};
