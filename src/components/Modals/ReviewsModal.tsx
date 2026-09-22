import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';
import type { ReviewItem } from '../../types/listing';
import { ReviewCard } from '../Reviews/ReviewCard';
import { Modal } from '../ui/Modal';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
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
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  rating,
  reviewsCount,
  ratingsBreakdown,
  reviews,
}) => {
  const [search, setSearch] = useState('');

  const filteredReviews = reviews.filter(
    (r) =>
      r.comment.toLowerCase().includes(search.toLowerCase()) ||
      r.authorName.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [
    { label: 'Cleanliness', score: ratingsBreakdown.cleanliness },
    { label: 'Accuracy', score: ratingsBreakdown.accuracy },
    { label: 'Check-in', score: ratingsBreakdown.checkIn },
    { label: 'Communication', score: ratingsBreakdown.communication },
    { label: 'Location', score: ratingsBreakdown.location },
    { label: 'Value', score: ratingsBreakdown.value },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      aria-label="All guest reviews modal"
      contentClassName="p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Rating breakdown */}
        <div className="md:col-span-5 space-y-6 md:sticky md:top-0">
          <div className="flex items-center gap-3">
            <Star className="w-7 h-7 fill-neutral-900 text-neutral-900" />
            <div className="text-3xl font-extrabold text-neutral-900">
              {rating.toFixed(2)}
            </div>
            <span className="text-2xl text-neutral-400">·</span>
            <div className="text-3xl font-extrabold text-neutral-900">
              {reviewsCount} reviews
            </div>
          </div>

          {/* Rating Breakdown bars */}
          <div className="space-y-3 pt-2">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-neutral-700 font-medium">{cat.label}</span>
                <div className="flex items-center gap-3 w-36">
                  <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-neutral-900 rounded-full"
                      style={{ width: `${(cat.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-neutral-900 w-6 text-right">
                    {cat.score.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Search + Reviews List */}
        <div className="md:col-span-7 space-y-6">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reviews"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-neutral-100 border border-transparent focus:border-neutral-900 focus:bg-white rounded-full pl-10 pr-4 py-2.5 text-sm outline-none transition text-neutral-900"
            />
          </div>

          <div className="space-y-6 divide-y divide-neutral-100">
            {filteredReviews.map((review) => (
              <div key={review.id} className="pt-6 first:pt-0">
                <ReviewCard review={review} />
              </div>
            ))}

            {filteredReviews.length === 0 && (
              <div className="py-12 text-center text-neutral-500 text-sm">
                No reviews found matching "{search}"
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
