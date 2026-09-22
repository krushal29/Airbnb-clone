import React from 'react';
import type { ReviewItem } from '../../types/listing';
import { ReviewCard } from './ReviewCard';
import { Button } from '../ui/Button';

interface ReviewsSectionProps {
  rating: number;
  reviewsCount: number;
  ratingsBreakdown: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
  };
  reviews: ReviewItem[];
  onShowAllReviews: () => void;
}

const reviewTags = [
  { emoji: '🛋️', label: 'Comfort', count: 6 },
  { emoji: '✅', label: 'Accuracy', count: 5 },
  { emoji: '🛁', label: 'Hot tub', count: 5 },
  { emoji: '🏠', label: 'Condition', count: 4 },
  { emoji: '🤝', label: 'Hospitality', count: 8 },
  { emoji: '✨', label: 'Cleanliness', count: 4 },
  { emoji: '🛎️', label: 'Amenities', count: 2 },
];

// Exact icons matching Airbnb's rating breakdown screenshot
const CleanlinessIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9.5 3.5c0 0-1 1-1 3s1 3 1 3" strokeLinecap="round"/>
    <path d="M6 9.5H4a1 1 0 00-1 1V18a1 1 0 001 1h10a1 1 0 001-1v-7.5a1 1 0 00-1-1h-2" strokeLinecap="round"/>
    <path d="M9 9.5V5" strokeLinecap="round"/>
    <path d="M7 9.5V7" strokeLinecap="round"/>
    <path d="M11 9.5V7" strokeLinecap="round"/>
    <path d="M6 13h6" strokeLinecap="round"/>
    <path d="M6 16h4" strokeLinecap="round"/>
    {/* Spray dots */}
    <circle cx="16" cy="5" r="0.5" fill="currentColor"/>
    <circle cx="18" cy="4" r="0.5" fill="currentColor"/>
    <circle cx="17" cy="7" r="0.5" fill="currentColor"/>
    <circle cx="19" cy="6" r="0.5" fill="currentColor"/>
  </svg>
);

const AccuracyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9"/>
    <path d="M8.5 12.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="10" cy="10" r="5.5"/>
    <path d="M14.5 14.5L19 19" strokeLinecap="round"/>
    <path d="M8 10h4M10 8v4" strokeLinecap="round"/>
  </svg>
);

const CommunicationIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16a1 1 0 011 1v10a1 1 0 01-1 1H8l-4 4V5a1 1 0 011-1z" strokeLinejoin="round"/>
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 6l4-2 10 4 4-2v14l-4 2-10-4-4 2V6z" strokeLinejoin="round"/>
    <path d="M7 4v14M17 6v14" strokeLinecap="round"/>
  </svg>
);

const ValueIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h8l8 8-8 8-8-8V4z" strokeLinejoin="round"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const categoryBreakdown = [
  { label: 'Cleanliness', key: 'cleanliness' as const, Icon: CleanlinessIcon },
  { label: 'Accuracy',    key: 'accuracy'    as const, Icon: AccuracyIcon },
  { label: 'Check-in',   key: 'checkIn'     as const, Icon: CheckInIcon },
  { label: 'Communication', key: 'communication' as const, Icon: CommunicationIcon },
  { label: 'Location',   key: 'location'    as const, Icon: LocationIcon },
  { label: 'Value',      key: 'value'       as const, Icon: ValueIcon },
];

// Realistic laurel sprig SVG matching Airbnb's 3D emoji style
const LaurelLeft = () => (
  <svg viewBox="0 0 60 90" className="w-12 h-16" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="leafGrad" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#6b6b6b"/>
        <stop offset="100%" stopColor="#1a1a1a"/>
      </radialGradient>
    </defs>
    {/* Stem */}
    <path d="M38 80 Q32 60 28 40 Q25 25 30 10" fill="none" stroke="#2a2a2a" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Leaves — left side, going from bottom to top */}
    <ellipse cx="24" cy="70" rx="10" ry="5.5" fill="url(#leafGrad)" transform="rotate(-40 24 70)"/>
    <ellipse cx="20" cy="58" rx="10" ry="5.5" fill="url(#leafGrad)" transform="rotate(-50 20 58)"/>
    <ellipse cx="17" cy="46" rx="10" ry="5"   fill="url(#leafGrad)" transform="rotate(-55 17 46)"/>
    <ellipse cx="16" cy="34" rx="9"  ry="4.5" fill="url(#leafGrad)" transform="rotate(-60 16 34)"/>
    <ellipse cx="18" cy="23" rx="8"  ry="4"   fill="url(#leafGrad)" transform="rotate(-50 18 23)"/>
    <ellipse cx="23" cy="14" rx="7"  ry="3.5" fill="url(#leafGrad)" transform="rotate(-35 23 14)"/>
    {/* Berries at bottom */}
    <circle cx="30" cy="78" r="3" fill="#2a2a2a"/>
    <circle cx="24" cy="82" r="2.5" fill="#333"/>
    <circle cx="36" cy="82" r="2.5" fill="#333"/>
  </svg>
);

const LaurelRight = () => (
  <svg viewBox="0 0 60 90" className="w-12 h-16" style={{ transform: 'scaleX(-1)' }} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="leafGrad2" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#6b6b6b"/>
        <stop offset="100%" stopColor="#1a1a1a"/>
      </radialGradient>
    </defs>
    <path d="M38 80 Q32 60 28 40 Q25 25 30 10" fill="none" stroke="#2a2a2a" strokeWidth="2.5" strokeLinecap="round"/>
    <ellipse cx="24" cy="70" rx="10" ry="5.5" fill="url(#leafGrad2)" transform="rotate(-40 24 70)"/>
    <ellipse cx="20" cy="58" rx="10" ry="5.5" fill="url(#leafGrad2)" transform="rotate(-50 20 58)"/>
    <ellipse cx="17" cy="46" rx="10" ry="5"   fill="url(#leafGrad2)" transform="rotate(-55 17 46)"/>
    <ellipse cx="16" cy="34" rx="9"  ry="4.5" fill="url(#leafGrad2)" transform="rotate(-60 16 34)"/>
    <ellipse cx="18" cy="23" rx="8"  ry="4"   fill="url(#leafGrad2)" transform="rotate(-50 18 23)"/>
    <ellipse cx="23" cy="14" rx="7"  ry="3.5" fill="url(#leafGrad2)" transform="rotate(-35 23 14)"/>
    <circle cx="30" cy="78" r="3" fill="#2a2a2a"/>
    <circle cx="24" cy="82" r="2.5" fill="#333"/>
    <circle cx="36" cy="82" r="2.5" fill="#333"/>
  </svg>
);

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  rating,
  reviewsCount,
  ratingsBreakdown,
  reviews,
  onShowAllReviews,
}) => {
  return (
    <section id="reviews-section" className="py-10 border-t border-neutral-200">

      {/* ── Rating Hero ── */}
      <div className="flex flex-col items-center justify-center text-center mb-10">
        {/* Laurel + number row */}
        <div className="flex items-center justify-center gap-3">
          <LaurelLeft />
          <span className="text-[80px] font-extrabold text-neutral-900 tracking-tight leading-none" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {rating.toFixed(2)}
          </span>
          <LaurelRight />
        </div>

        {/* Text below */}
        <div className="mt-4 space-y-1">
          <p className="text-xl font-bold text-neutral-900">Guest favourite</p>
          <p className="text-sm text-neutral-600 max-w-xs mx-auto leading-snug">
            This home is a guest favourite based on ratings, reviews and reliability
          </p>
          <button className="text-sm font-semibold text-neutral-900 underline underline-offset-2 mt-1 cursor-pointer hover:opacity-70 transition">
            How reviews work
          </button>
        </div>
      </div>

      {/* ── Ratings Breakdown — Overall + 6 category columns ── */}
      <div className="flex border-t border-b border-neutral-200 mb-10 overflow-x-auto">

        {/* Overall rating column with bar chart */}
        <div className="flex flex-col gap-2 pr-8 py-5 border-r border-neutral-200 shrink-0 min-w-[140px]">
          <div className="text-sm font-semibold text-neutral-900 mb-1">Overall rating</div>
          {[5, 4, 3, 2, 1].map((star, i) => (
            <div key={star} className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden max-w-[100px]">
                <div
                  className="h-full bg-neutral-900 rounded-full"
                  style={{ width: i === 0 ? '95%' : i === 1 ? '10%' : '0%' }}
                />
              </div>
              <span className="text-xs text-neutral-500 w-2">{star}</span>
            </div>
          ))}
        </div>

        {/* 6 category columns */}
        {categoryBreakdown.map((cat, i) => {
          const score = ratingsBreakdown[cat.key];
          return (
            <div
              key={cat.label}
              className={`flex flex-col gap-3 px-6 py-5 shrink-0 ${i < categoryBreakdown.length - 1 ? 'border-r border-neutral-200' : ''}`}
            >
              <div className="text-sm font-semibold text-neutral-800">{cat.label}</div>
              <div className="text-2xl font-bold text-neutral-900">{score.toFixed(1)}</div>
              <cat.Icon />
            </div>
          );
        })}
      </div>

      {/* ── Review Filter Tags ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {reviewTags.map((tag) => (
          <button
            key={tag.label}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-neutral-300 rounded-full text-sm font-medium text-neutral-800 hover:border-neutral-500 transition whitespace-nowrap cursor-pointer shrink-0"
          >
            <span>{tag.emoji}</span>
            <span>{tag.label}</span>
            <span className="text-neutral-500 font-normal">{tag.count}</span>
          </button>
        ))}
      </div>

      {/* ── Review Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 mb-8">
        {reviews.slice(0, 6).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* ── Show all reviews ── */}
      <Button variant="outline" size="lg" onClick={onShowAllReviews}>
        Show all {reviewsCount} reviews
      </Button>
    </section>
  );
};
