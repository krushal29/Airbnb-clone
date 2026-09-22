import React from 'react';
import { Star } from 'lucide-react';

interface GuestFavouriteBadgeProps {
  rating: number;
  reviewsCount: number;
  tagline: string;
  onReviewsClick?: () => void;
}

export const GuestFavouriteBadge: React.FC<GuestFavouriteBadgeProps> = ({
  rating,
  reviewsCount,
  tagline,
  onReviewsClick,
}) => {
  return (
    <div className="rounded-3xl border border-neutral-200 p-5 my-6 flex flex-row items-center justify-between gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {/* Left: Laurel Wreath + "Guest favourite" */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Left Laurel leaf SVG */}
        <svg className="w-7 h-9 text-neutral-800" viewBox="0 0 32 40" fill="currentColor">
          <path d="M14 2C13 8 7 14 2 17c5 3 11 9 12 15-1-6 2-12 5-15-3-3-6-9-5-15z" opacity="0.9" />
          <path d="M8 8C7 12 4 15 1 17c3 2 6 5 7 9-1-4 1-8 3-10-2-2-3-5-3-8z" opacity="0.6" />
        </svg>

        <div className="text-center">
          <div className="text-sm font-semibold text-neutral-900 leading-tight">Guest</div>
          <div className="text-base font-bold text-neutral-900 leading-tight">favourite</div>
        </div>

        {/* Right Laurel leaf SVG */}
        <svg className="w-7 h-9 text-neutral-800 scale-x-[-1]" viewBox="0 0 32 40" fill="currentColor">
          <path d="M14 2C13 8 7 14 2 17c5 3 11 9 12 15-1-6 2-12 5-15-3-3-6-9-5-15z" opacity="0.9" />
          <path d="M8 8C7 12 4 15 1 17c3 2 6 5 7 9-1-4 1-8 3-10-2-2-3-5-3-8z" opacity="0.6" />
        </svg>
      </div>

      {/* Center: Tagline */}
      <div className="text-sm text-neutral-700 leading-snug flex-1 min-w-0">
        {tagline}
      </div>

      {/* Right: Rating & Review Count with divider */}
      <div className="flex items-center gap-5 shrink-0 divide-x divide-neutral-200">
        <div className="text-center pr-1">
          <div className="text-2xl font-bold text-neutral-900 leading-none">
            {rating.toFixed(2)}
          </div>
          <div className="flex items-center justify-center gap-0.5 mt-1 text-neutral-900">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-neutral-900 text-neutral-900" />
            ))}
          </div>
        </div>

        <button
          onClick={onReviewsClick}
          className="text-center pl-5 hover:opacity-75 transition cursor-pointer"
        >
          <div className="text-2xl font-bold text-neutral-900 leading-none">
            {reviewsCount}
          </div>
          <div className="text-xs text-neutral-800 underline font-semibold mt-1">
            Reviews
          </div>
        </button>
      </div>
    </div>
  );
};
