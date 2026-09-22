import React from 'react';
import { ShoppingBag, Fan, DoorOpen } from 'lucide-react';

export const ListingHighlights: React.FC = () => {
  return (
    <div className="py-6 border-t border-neutral-200 space-y-6">
      {/* Item 1: Outdoor entertainment */}
      <div className="flex items-start gap-5">
        <div className="text-neutral-800 pt-0.5">
          <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
        </div>
        <div>
          <div className="text-base font-semibold text-neutral-900 leading-tight">
            Outdoor entertainment
          </div>
          <div className="text-sm text-neutral-600 mt-0.5">
            The pool and alfresco dining are great for summer trips.
          </div>
        </div>
      </div>

      {/* Item 2: Designed for staying cool */}
      <div className="flex items-start gap-5">
        <div className="text-neutral-800 pt-0.5">
          <Fan className="w-6 h-6 stroke-[1.5]" />
        </div>
        <div>
          <div className="text-base font-semibold text-neutral-900 leading-tight">
            Designed for staying cool
          </div>
          <div className="text-sm text-neutral-600 mt-0.5">
            Beat the heat with the A/C and ceiling fan.
          </div>
        </div>
      </div>

      {/* Item 3: Self check-in */}
      <div className="flex items-start gap-5">
        <div className="text-neutral-800 pt-0.5">
          <DoorOpen className="w-6 h-6 stroke-[1.5]" />
        </div>
        <div>
          <div className="text-base font-semibold text-neutral-900 leading-tight">
            Self check-in
          </div>
          <div className="text-sm text-neutral-600 mt-0.5">
            You can check in with the building staff.
          </div>
        </div>
      </div>
    </div>
  );
};
