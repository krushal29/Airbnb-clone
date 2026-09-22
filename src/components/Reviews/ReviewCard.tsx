import React from 'react';
import { Star } from 'lucide-react';
import type { ReviewItem } from '../../types/listing';

interface ReviewCardProps {
  review: ReviewItem;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="py-3">
      {/* Author Row */}
      <div className="flex items-center gap-3.5 mb-3">
        <img
          src={review.authorAvatar}
          alt={review.authorName}
          className="w-11 h-11 rounded-full object-cover bg-neutral-200"
        />
        <div>
          <div className="font-semibold text-neutral-900 text-base leading-tight">
            {review.authorName}
          </div>
          <div className="text-xs text-neutral-500 mt-0.5">
            {review.date} {review.stayDuration ? `· ${review.stayDuration}` : ''}
          </div>
        </div>
      </div>

      {/* Rating stars */}
      <div className="flex items-center gap-0.5 mb-2 text-neutral-900">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />
        ))}
      </div>

      {/* Review Comment */}
      <p className="text-neutral-800 text-sm leading-relaxed font-normal">
        {review.comment}
      </p>
    </div>
  );
};
