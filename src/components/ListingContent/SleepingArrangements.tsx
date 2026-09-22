import React from 'react';
import type { SleepingArrangement } from '../../types/listing';

interface SleepingArrangementsProps {
  arrangements: SleepingArrangement[];
}

export const SleepingArrangements: React.FC<SleepingArrangementsProps> = ({
  arrangements,
}) => {
  return (
    <div className="py-8 border-t border-neutral-200">
      <h2 className="text-[22px] font-semibold text-neutral-900 mb-6">
        Where you'll sleep
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[620px]">
        {arrangements.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-neutral-200 overflow-hidden group hover:shadow-sm transition"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100">
              <img
                src={item.imageUrl}
                alt={item.roomName}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
              />
            </div>
            <div className="p-4">
              <div className="font-semibold text-neutral-900 text-base">
                {item.roomName}
              </div>
              <div className="text-sm text-neutral-600 mt-0.5">
                {item.bedType}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
