import React from 'react';
import { Tag } from 'lucide-react';

interface DiscountBannerProps {
  discountPercent: number;
  onClaim?: () => void;
}

export const DiscountBanner: React.FC<DiscountBannerProps> = ({
  discountPercent = 10,
}) => {

  return (
    <div className="rounded-2xl border border-neutral-200 p-4 mb-6 flex items-center justify-between shadow-sm bg-white">
      <div className="flex items-center gap-3.5">
        {/* Green coupon tag icon */}
        <div className="text-emerald-700 bg-emerald-50 p-2 rounded-xl">
          <Tag className="w-5 h-5 stroke-[2] fill-emerald-600 text-emerald-600" />
        </div>
        <div>
          <div className="text-sm font-semibold text-neutral-900 leading-tight">
            Get {discountPercent}% off your next stay.
          </div>
          <button
            type="button"
            className="text-xs text-neutral-600 underline font-medium cursor-pointer hover:text-black mt-0.5"
          >
            Terms apply
          </button>
        </div>
      </div>

      <button
        type="button"
        className="text-sm font-semibold px-4 py-2 rounded-xl border border-neutral-900 text-neutral-900 hover:bg-neutral-50 cursor-pointer transition"
      >
        Claim
      </button>
    </div>
  );
};
