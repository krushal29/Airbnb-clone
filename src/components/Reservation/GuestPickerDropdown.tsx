import React from 'react';
import { Plus, Minus } from 'lucide-react';

export interface GuestCount {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

interface GuestPickerDropdownProps {
  guests: GuestCount;
  maxGuests: number;
  onChange: (guests: GuestCount) => void;
  onClose: () => void;
}

export const GuestPickerDropdown: React.FC<GuestPickerDropdownProps> = ({
  guests,
  maxGuests,
  onChange,
  onClose,
}) => {
  const totalStandardGuests = guests.adults + guests.children;
  const canAddGuest = totalStandardGuests < maxGuests;

  const updateCount = (type: keyof GuestCount, delta: number) => {
    if (delta > 0 && (type === 'adults' || type === 'children') && !canAddGuest) {
      return;
    }

    const current = guests[type];
    const updated = Math.max(type === 'adults' ? 1 : 0, current + delta);

    onChange({
      ...guests,
      [type]: updated,
    });
  };

  return (
    <div
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.15)] border border-neutral-200 p-5 z-30 animate-in fade-in zoom-in-95 duration-150"
      role="dialog"
      aria-label="Guest selection"
    >
      <div className="space-y-5">
        {/* Adults */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-neutral-900 text-sm">Adults</div>
            <div className="text-xs text-neutral-500">Age 13+</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateCount('adults', -1)}
              disabled={guests.adults <= 1}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-30 disabled:border-neutral-200 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label="Decrease adults"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-4 text-center text-sm font-semibold text-neutral-900">
              {guests.adults}
            </span>
            <button
              type="button"
              onClick={() => updateCount('adults', 1)}
              disabled={!canAddGuest}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-30 disabled:border-neutral-200 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label="Increase adults"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-neutral-900 text-sm">Children</div>
            <div className="text-xs text-neutral-500">Ages 2–12</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateCount('children', -1)}
              disabled={guests.children <= 0}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-30 disabled:border-neutral-200 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label="Decrease children"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-4 text-center text-sm font-semibold text-neutral-900">
              {guests.children}
            </span>
            <button
              type="button"
              onClick={() => updateCount('children', 1)}
              disabled={!canAddGuest}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-30 disabled:border-neutral-200 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label="Increase children"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Infants */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-neutral-900 text-sm">Infants</div>
            <div className="text-xs text-neutral-500">Under 2</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateCount('infants', -1)}
              disabled={guests.infants <= 0}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-30 disabled:border-neutral-200 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label="Decrease infants"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-4 text-center text-sm font-semibold text-neutral-900">
              {guests.infants}
            </span>
            <button
              type="button"
              onClick={() => updateCount('infants', 1)}
              disabled={guests.infants >= 5}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-30 disabled:border-neutral-200 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label="Increase infants"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pets */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-neutral-900 text-sm">Pets</div>
            <div className="text-xs text-neutral-500">Bringing a pet?</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateCount('pets', -1)}
              disabled={guests.pets <= 0}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-30 disabled:border-neutral-200 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label="Decrease pets"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-4 text-center text-sm font-semibold text-neutral-900">
              {guests.pets}
            </span>
            <button
              type="button"
              onClick={() => updateCount('pets', 1)}
              disabled={guests.pets >= 2}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-30 disabled:border-neutral-200 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label="Increase pets"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="text-xs text-neutral-500 mt-4 leading-normal">
        This place has a maximum of {maxGuests} guests, not including infants.
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-200 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-semibold underline underline-offset-4 text-neutral-900 hover:text-black cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
