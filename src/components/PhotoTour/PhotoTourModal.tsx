import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChevronLeft, Share, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ListingPhoto } from '../../types/listing';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface PhotoTourModalProps {
  isOpen: boolean;
  photos: ListingPhoto[];
  onClose: () => void;
  onPhotoClick: (index: number) => void;
  onShareClick?: () => void;
}

// Room metadata — keys must EXACTLY match the category strings in listing.ts
const roomMeta: Record<string, { label: string; amenities: string }> = {
  'Living Room': {
    label: 'Living room',
    amenities: 'Sofa · Air conditioning · Ceiling fan · TV',
  },
  'Patio & Jacuzzi': {
    label: 'Patio & Jacuzzi',
    amenities: 'Private outdoor lounge · Hot tub · Cane furniture · Ambient lighting · Ceiling fan',
  },
  'Kitchen & Dining': {
    label: 'Kitchen & dining',
    amenities: 'Full kitchen · Refrigerator · Microwave · Cooking basics · Dining table',
  },
  'Bedroom & Bath': {
    label: 'Bedroom & bath',
    amenities: 'King bed · En suite bathroom · Fresh linens · Wardrobe · Pool towels',
  },
  'Exterior & Pool': {
    label: 'Exterior & pool',
    amenities: 'Private pool · Sun loungers · Garden · Parking space · Tropical flora',
  },
};

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  isOpen,
  photos,
  onClose,
  onPhotoClick,
  onShareClick,
}) => {
  useBodyScrollLock(isOpen);

  // Derive unique categories in order of first appearance in photos array
  const uniqueCategories = useMemo(() => {
    const categories: string[] = [];
    const seen = new Set<string>();
    for (const p of photos) {
      if (!seen.has(p.category)) {
        seen.add(p.category);
        categories.push(p.category);
      }
    }
    return categories;
  }, [photos]);

  const [isSaved, setIsSaved] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const activeCategory = (selectedCategory && uniqueCategories.includes(selectedCategory))
    ? selectedCategory
    : (uniqueCategories[0] || '');

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Keyboard Escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset scroll on open
  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  // Scroll spy: update activeCategory based on visible sections
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    // Use the top of the container + offset for header height (~140px total)
    const offset = 160;
    const scrollTop = container.scrollTop + offset;

    let current = uniqueCategories[0];
    for (const cat of uniqueCategories) {
      const el = sectionRefs.current[cat];
      if (el && el.offsetTop <= scrollTop) {
        current = cat;
      }
    }
    setSelectedCategory(current);
  }, [uniqueCategories]);

  // Scroll to a category section
  const scrollToCategory = (cat: string) => {
    const el = sectionRefs.current[cat];
    const container = containerRef.current;
    if (el && container) {
      container.scrollTo({ top: el.offsetTop - 24, behavior: 'smooth' });
    }
    setSelectedCategory(cat);
  };

  // Get thumbnail for each category (first photo in that category)
  const getCategoryThumb = (cat: string): string => {
    const photo = photos.find((p) => p.category === cat);
    return photo?.url || '';
  };

  // Get display label for a category
  const getCategoryLabel = (cat: string): string => {
    return roomMeta[cat]?.label || cat;
  };

  // Heights for top bars: header 64px + thumbnail strip ~90px = ~154px total
  const STICKY_TOP = 154;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-40 bg-white flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen photo tour"
        >
          {/* ── Top Header: back | "Photo tour" title | share + heart ── */}
          <div className="h-16 px-6 lg:px-12 border-b border-neutral-200 flex items-center justify-between shrink-0 bg-white z-20">
            <button
              onClick={onClose}
              className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition text-neutral-800 flex items-center gap-1 cursor-pointer"
              aria-label="Back to listing"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <span className="font-semibold text-neutral-900 text-base">Photo tour</span>

            <div className="flex items-center gap-1 text-neutral-800">
              <button
                onClick={onShareClick}
                className="p-2 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                aria-label="Share listing"
              >
                <Share className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="p-2 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                aria-label="Save listing"
              >
                <Heart
                  className={`w-4 h-4 ${isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-neutral-800'}`}
                />
              </button>
            </div>
          </div>

          {/* ── Thumbnail Nav Strip ── */}
          <div className="shrink-0 border-b border-neutral-200 bg-white z-10 overflow-x-auto scrollbar-none">
            <div className="flex items-stretch gap-0 px-6 lg:px-12">
              {uniqueCategories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => scrollToCategory(cat)}
                    className="flex flex-col items-center gap-2 py-3 mr-5 shrink-0 cursor-pointer group relative"
                  >
                    {/* Thumbnail image */}
                    <div
                      className={`w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                        isActive ? 'border-neutral-900' : 'border-neutral-200 group-hover:border-neutral-400'
                      }`}
                    >
                      <img
                        src={getCategoryThumb(cat)}
                        alt={cat}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Label with active underline */}
                    <span
                      className={`text-xs whitespace-nowrap font-medium transition-colors ${
                        isActive ? 'text-neutral-900' : 'text-neutral-500 group-hover:text-neutral-700'
                      }`}
                    >
                      {getCategoryLabel(cat)}
                    </span>
                    {/* Bottom underline indicator */}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all ${
                        isActive ? 'bg-neutral-900' : 'bg-transparent'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Main Scrollable Content ── */}
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto"
            onScroll={handleScroll}
          >
            <div className="max-w-5xl mx-auto px-6 lg:px-12 py-8 space-y-0">
              {uniqueCategories.map((category, idx) => {
                const categoryPhotos = photos.filter((p) => p.category === category);
                if (categoryPhotos.length === 0) return null;

                const meta = roomMeta[category];
                const label = meta?.label || category;
                const amenities = meta?.amenities || '';

                // First photo: large hero. Rest: 2-col grid
                const [firstPhoto, ...restPhotos] = categoryPhotos;

                return (
                  <div
                    key={category}
                    ref={(el) => { sectionRefs.current[category] = el; }}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${idx > 0 ? 'pt-14' : ''}`}
                  >
                    {/* LEFT: Room name + amenities — sticky so it stays visible while scrolling photos */}
                    <div
                      className="flex flex-col justify-start"
                      style={{ position: 'sticky', top: `${STICKY_TOP}px`, alignSelf: 'start' }}
                    >
                      <h2 className="text-2xl font-bold text-neutral-900 leading-tight mb-2">
                        {label}
                      </h2>
                      {amenities && (
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {amenities}
                        </p>
                      )}
                    </div>

                    {/* RIGHT: Photos — large hero + 2-col grid of smaller ones */}
                    <div className="flex flex-col gap-3">
                      {/* Main large photo */}
                      {firstPhoto && (
                        <div
                          className="group cursor-pointer rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-100 relative"
                          onClick={() => {
                            const idx = photos.findIndex((p) => p.id === firstPhoto.id);
                            onPhotoClick(idx >= 0 ? idx : 0);
                          }}
                        >
                          <img
                            src={firstPhoto.url}
                            alt={firstPhoto.alt}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                      )}

                      {/* Remaining photos in 2-col grid */}
                      {restPhotos.length > 0 && (
                        <div className="grid grid-cols-2 gap-3">
                          {restPhotos.map((photo) => {
                            const originalIndex = photos.findIndex((p) => p.id === photo.id);
                            return (
                              <div
                                key={photo.id}
                                className="group cursor-pointer rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-100 relative"
                                onClick={() => onPhotoClick(originalIndex >= 0 ? originalIndex : 0)}
                              >
                                <img
                                  src={photo.url}
                                  alt={photo.alt}
                                  className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Bottom spacer */}
              <div className="h-16" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
