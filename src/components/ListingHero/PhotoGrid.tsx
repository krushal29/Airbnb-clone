import React from 'react';
import { LayoutGrid } from 'lucide-react';
import type { ListingPhoto } from '../../types/listing';

interface PhotoGridProps {
  photos: ListingPhoto[];
  onOpenTour: (index?: number) => void;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onOpenTour }) => {
  const displayPhotos = photos.slice(0, 5);

  return (
    <section
      id="photos-section"
      className="relative mb-8 rounded-xl overflow-hidden"
      aria-label="Listing photo gallery"
    >
      {/* 
        Grid: 1 large photo on left (col-span-2, row-span-2) + 2×2 on right
        Gap: 2px tight gap — outer rounded corners clip everything cleanly
      */}
      <div className="grid h-[480px] w-full" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '2px' }}>

        {/* ── Left: Large hero photo ── */}
        {displayPhotos[0] && (
          <div
            className="relative overflow-hidden cursor-pointer group bg-neutral-200"
            style={{ gridColumn: '1', gridRow: '1 / span 2' }}
            onClick={() => onOpenTour(0)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenTour(0);
              }
            }}
            aria-label="View photo 1"
          >
            <img
              src={displayPhotos[0].url}
              alt={displayPhotos[0].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02] group-hover:brightness-95"
            />
          </div>
        )}

        {/* ── Right column: 2×2 grid inside the second column ── */}
        <div
          className="grid"
          style={{ gridColumn: '2', gridRow: '1 / span 2', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '2px' }}
        >
          {/* Top-left */}
          {displayPhotos[1] && (
            <div
              className="relative overflow-hidden cursor-pointer group bg-neutral-200"
              onClick={() => onOpenTour(1)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenTour(1);
                }
              }}
              aria-label="View photo 2"
            >
              <img
                src={displayPhotos[1].url}
                alt={displayPhotos[1].alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02] group-hover:brightness-95"
              />
            </div>
          )}

          {/* Top-right */}
          {displayPhotos[2] && (
            <div
              className="relative overflow-hidden cursor-pointer group bg-neutral-200"
              onClick={() => onOpenTour(2)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenTour(2);
                }
              }}
              aria-label="View photo 3"
            >
              <img
                src={displayPhotos[2].url}
                alt={displayPhotos[2].alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02] group-hover:brightness-95"
              />
            </div>
          )}

          {/* Bottom-left */}
          {displayPhotos[3] && (
            <div
              className="relative overflow-hidden cursor-pointer group bg-neutral-200"
              onClick={() => onOpenTour(3)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenTour(3);
                }
              }}
              aria-label="View photo 4"
            >
              <img
                src={displayPhotos[3].url}
                alt={displayPhotos[3].alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02] group-hover:brightness-95"
              />
            </div>
          )}

          {/* Bottom-right — with "Show all photos" button */}
          {displayPhotos[4] && (
            <div
              className="relative overflow-hidden cursor-pointer group bg-neutral-200"
              onClick={() => onOpenTour(4)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenTour(4);
                }
              }}
              aria-label="View photo 5"
            >
              <img
                src={displayPhotos[4].url}
                alt={displayPhotos[4].alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02] group-hover:brightness-95"
              />
            </div>
          )}
        </div>
      </div>

      {/* "Show all photos" button — bottom right, inside the grid */}
      <button
        onClick={() => onOpenTour(0)}
        className="absolute bottom-4 right-4 bg-white text-neutral-900 font-semibold text-sm px-4 py-2 rounded-lg border border-neutral-300 shadow-sm flex items-center gap-2 hover:bg-neutral-50 transition cursor-pointer"
      >
        <LayoutGrid className="w-4 h-4 stroke-[1.8]" />
        <span>Show all photos</span>
      </button>
    </section>
  );
};
