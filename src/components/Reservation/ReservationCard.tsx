import React, { useState, useEffect } from 'react';
import { ChevronDown, Flag } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import type { GuestCount } from './GuestPickerDropdown';

interface ReservationCardProps {
  pricePerNight: number;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: GuestCount;
  maxGuests?: number;
  cleaningFee?: number;
  serviceFee?: number;
  isDiscountApplied?: boolean;
  discountPercent?: number;
  onSelectDatesClick: () => void;
  onGuestsChange?: (guests: GuestCount) => void;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
  pricePerNight,
  checkIn,
  checkOut,
  guests,
  onSelectDatesClick,
}) => {
  const [toast, setToast] = useState(false);

  // Auto-hide toast after 3s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // Calculate nights
  const nights = (() => {
    if (!checkIn || !checkOut) return 5;
    const diff = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 5;
  })();

  const totalPrice = Math.round(pricePerNight * nights);

  // Format date as M/D/YYYY
  const formatDate = (date: Date | null) => {
    if (!date) return 'Add date';
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const totalGuests = guests.adults + guests.children;
  const guestLabel = `${totalGuests} guest${totalGuests > 1 ? 's' : ''}${
    guests.infants > 0 ? `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}` : ''
  }${guests.pets > 0 ? `, ${guests.pets} pet${guests.pets > 1 ? 's' : ''}` : ''}`;

  return (
    <>
      <div
        id="reservation-card"
        className="sticky top-28 bg-white rounded-3xl border border-neutral-200 p-6 shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
      >
        {/* Price */}
        <div className="text-xl font-bold text-neutral-900 mb-5">
          ₹{formatPrice(totalPrice)}{' '}
          <span className="text-base font-normal text-neutral-700">for {nights} nights</span>
        </div>

        {/* Date & Guest selector box */}
        <div className="border border-neutral-300 rounded-2xl overflow-hidden mb-4">
          {/* CHECK-IN / CHECKOUT — clickable */}
          <div
            onClick={onSelectDatesClick}
            className="grid grid-cols-2 border-b border-neutral-300 divide-x divide-neutral-300 cursor-pointer hover:bg-neutral-50 transition"
          >
            <div className="p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 mb-0.5">Check-in</div>
              <div className="text-sm text-neutral-800">{formatDate(checkIn)}</div>
            </div>
            <div className="p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 mb-0.5">Checkout</div>
              <div className="text-sm text-neutral-800">{formatDate(checkOut)}</div>
            </div>
          </div>

          {/* GUESTS — display only, no dropdown */}
          <div className="p-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 mb-0.5">Guests</div>
              <div className="text-sm text-neutral-800">{guestLabel}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-neutral-600" />
          </div>
        </div>

        {/* Free cancellation */}
        <div className="text-sm text-neutral-700 text-center mb-4">
          Free cancellation before{' '}
          <span className="font-semibold text-neutral-900">17 October</span>
        </div>

        {/* Reserve button */}
        <button
          type="button"
          onClick={() => setToast(true)}
          className="w-full bg-gradient-to-r from-[#E61E4D] to-[#BD1E59] hover:from-[#D70466] hover:to-[#BD1E59] text-white font-semibold text-base py-3.5 rounded-full transition shadow-md cursor-pointer"
        >
          Reserve
        </button>

        {/* You won't be charged yet */}
        <div className="text-center text-sm text-neutral-500 mt-3">
          You won't be charged yet
        </div>

        {/* Report this listing */}
        <div className="pt-5 text-center border-t border-neutral-100 mt-5">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-2 transition cursor-pointer"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Report this listing</span>
          </button>
        </div>
      </div>

      {/* Bottom-center toast */}
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
