import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

interface StickySubNavProps {
  isVisible: boolean;
  activeSection: 'photos' | 'amenities' | 'reviews' | 'location';
  totalPrice: number;
  nightsCount: number;
  rating: number;
  reviewsCount: number;
  onReserveClick: () => void;
}

export const StickySubNav: React.FC<StickySubNavProps> = ({
  isVisible,
  activeSection,
  totalPrice,
  nightsCount,
  rating,
  reviewsCount,
  onReserveClick,
}) => {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  const navBtnClass = (section: string) =>
    `h-full flex items-center text-sm font-semibold transition border-b-2 cursor-pointer ${
      activeSection === section
        ? 'border-neutral-900 text-neutral-900'
        : 'border-transparent text-neutral-600 hover:text-neutral-900'
    }`;

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-neutral-200 h-[56px] shadow-[0_1px_4px_rgba(0,0,0,0.08)] animate-in fade-in duration-200"
        role="navigation"
        aria-label="Listing section navigation"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-full flex items-center justify-between">
          {/* Left: Nav tabs */}
          <div className="flex items-center gap-8 h-full">
            <button onClick={() => scrollTo('photos-section')} className={navBtnClass('photos')}>
              Photos
            </button>
            <button onClick={() => scrollTo('amenities-section')} className={navBtnClass('amenities')}>
              Amenities
            </button>
            <button onClick={() => scrollTo('reviews-section')} className={navBtnClass('reviews')}>
              Reviews
            </button>
            <button onClick={() => scrollTo('location-section')} className={navBtnClass('location')}>
              Location
            </button>
          </div>

          {/* Right: Price + Reserve */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-baseline justify-end gap-1">
                <span className="font-bold text-neutral-900 text-[15px]">
                  ₹{formatPrice(totalPrice)}
                </span>
                <span className="text-sm font-normal text-neutral-600">for {nightsCount} nights</span>
              </div>
              <div className="flex items-center justify-end gap-1 text-xs text-neutral-700">
                <Star className="w-3 h-3 fill-neutral-900 text-neutral-900" />
                <span className="font-semibold">{rating.toFixed(2)}</span>
                <span>·</span>
                <button
                  type="button"
                  className="text-neutral-600 underline cursor-pointer"
                  onClick={() => scrollTo('reviews-section')}
                >
                  {reviewsCount} reviews
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onReserveClick();
                setToast(true);
              }}
              className="bg-gradient-to-r from-[#E61E4D] to-[#BD1E59] hover:from-[#D70466] hover:to-[#BD1E59] text-white font-semibold text-sm px-6 py-2.5 rounded-full transition shadow-sm cursor-pointer"
            >
              Reserve
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 ${
          toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="bg-neutral-900 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-xl whitespace-nowrap">
          You won't be charged yet
        </div>
      </div>
    </>
  );
};
