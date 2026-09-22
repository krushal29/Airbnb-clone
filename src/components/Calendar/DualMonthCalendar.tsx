import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Keyboard } from 'lucide-react';

interface DualMonthCalendarProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onSelectDates: (checkIn: Date | null, checkOut: Date | null) => void;
  city?: string;
}

export const DualMonthCalendar: React.FC<DualMonthCalendarProps> = ({
  checkIn,
  checkOut,
  onSelectDates,
  city = 'Candolim',
}) => {
  // Calendar base state: October 2026 (static view)
  const [currentMonthDate] = useState(new Date(2026, 9, 1)); // Oct 2026

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = Math.round(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();

  // Format date helper
  const formatDateRange = () => {
    if (!checkIn) return 'Select check-in date';
    if (!checkOut) return `${checkIn.getDate()} ${checkIn.toLocaleString('en-US', { month: 'short' })} ${checkIn.getFullYear()} - Select checkout`;

    const inStr = `${checkIn.getDate()} ${checkIn.toLocaleString('en-US', { month: 'short' })} ${checkIn.getFullYear()}`;
    const outStr = `${checkOut.getDate()} ${checkOut.toLocaleString('en-US', { month: 'short' })} ${checkOut.getFullYear()}`;
    return `${inStr} - ${outStr}`;
  };

  // Day click logic
  const handleDayClick = (date: Date) => {
    // Disabled if before Oct 18, 2026
    const minSelectable = new Date(2026, 9, 18);
    if (date < minSelectable) return;

    if (!checkIn || (checkIn && checkOut)) {
      onSelectDates(date, null);
    } else if (checkIn && !checkOut) {
      if (date.getTime() === checkIn.getTime()) {
        return;
      }
      if (date < checkIn) {
        onSelectDates(date, null);
      } else {
        onSelectDates(checkIn, date);
      }
    }
  };

  // Render a single month calendar
  const renderMonth = (monthOffset: number, showPrev: boolean, showNext: boolean) => {
    const monthDate = new Date(
      currentMonthDate.getFullYear(),
      currentMonthDate.getMonth() + monthOffset,
      1
    );
    const monthName = monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const firstDayIndex = monthDate.getDay(); // 0 = Sun
    const daysInMonth = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + 1,
      0
    ).getDate();

    const days = [];
    // Padding blanks
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`blank-${i}`} className="h-10 w-full" />);
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      const dayDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), d);
      const minDate = new Date(2026, 9, 18);
      const isPast = dayDate < minDate;

      const isCheckIn = checkIn && dayDate.toDateString() === checkIn.toDateString();
      const isCheckOut = checkOut && dayDate.toDateString() === checkOut.toDateString();
      const isInRange =
        checkIn &&
        checkOut &&
        dayDate > checkIn &&
        dayDate < checkOut;

      // Determine which day of the week this day falls on (for row-spanning background)
      const dayOfWeek = dayDate.getDay(); // 0=Sun, 6=Sat
      const isFirstOfRow = dayOfWeek === 0; // Sunday
      const isLastOfRow = dayOfWeek === 6; // Saturday
      const isLastDayOfMonth = d === daysInMonth;
      const isFirstDayOfMonth = d === 1;

      let dayClass = 'relative h-10 flex items-center justify-center select-none';

      if (!isPast) {
        dayClass += ' cursor-pointer';
      }

      days.push(
        <div
          key={`day-${d}`}
          className={dayClass}
          onClick={() => !isPast && handleDayClick(dayDate)}
        >
          {/* Range background - spans full width of the cell */}
          {isInRange && (
            <div className="absolute inset-0 bg-neutral-100 z-0" />
          )}

          {/* Left half background for checkout endpoint */}
          {isCheckOut && checkIn && (
            <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-neutral-100 z-0" />
          )}

          {/* Right half background for checkin endpoint */}
          {isCheckIn && checkOut && (
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-neutral-100 z-0" />
          )}

          {/* Round caps at start/end of range rows */}
          {isInRange && isFirstOfRow && (
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-white z-0" />
          )}
          {isInRange && (isLastOfRow || isLastDayOfMonth) && (
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white z-0" />
          )}
          {isCheckIn && checkOut && (isFirstOfRow || isFirstDayOfMonth) && (
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white z-0" />
          )}
          {isCheckOut && checkIn && (isLastOfRow || isLastDayOfMonth) && (
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-white z-0" />
          )}

          {/* Circle for selected endpoints */}
          {(isCheckIn || isCheckOut) ? (
            <span className="z-10 w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center font-semibold text-sm shadow-sm">
              {d}
            </span>
          ) : isPast ? (
            <span className="z-10 text-sm text-neutral-300">{d}</span>
          ) : isInRange ? (
            <span className="z-10 text-sm text-neutral-900 font-medium">{d}</span>
          ) : (
            <span className="z-10 text-sm text-neutral-800 font-medium w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 transition">
              {d}
            </span>
          )}
        </div>
      );
    }

    return (
      <div className="w-full max-w-[320px]">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-4 h-8 px-1">
          {showPrev ? (
            <button
              type="button"
              className="p-1 rounded-full hover:bg-neutral-100 transition cursor-pointer text-neutral-700"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-7" />
          )}

          <div className="font-semibold text-neutral-900 text-base">
            {monthName}
          </div>

          {showNext ? (
            <button
              type="button"
              className="p-1 rounded-full hover:bg-neutral-100 transition cursor-pointer text-neutral-700"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-7" />
          )}
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-neutral-500 mb-2">
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-y-0.5 text-center">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="py-8 border-t border-neutral-200">
      {/* Title & subtitle */}
      <div className="mb-6">
        <h2 className="text-[22px] font-semibold text-neutral-900">
          {nights > 0 ? `${nights} nights in ${city}` : `Select dates`}
        </h2>
        <div className="text-sm text-neutral-500 mt-1">
          {formatDateRange()}
        </div>
      </div>

      {/* Side by side months */}
      <div className="flex flex-col sm:flex-row items-start gap-12 justify-start mb-6">
        {renderMonth(0, true, false)}
        {renderMonth(1, false, true)}
      </div>

      {/* Footer controls: Keyboard and Clear dates */}
      <div className="flex items-center justify-between max-w-[680px] pt-2">
        <button
          className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-700 transition cursor-pointer"
          aria-label="Keyboard navigation info"
          title="Use arrow keys to navigate dates"
        >
          <Keyboard className="w-5 h-5" />
        </button>

        <button
          type="button"
          className="text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:text-black transition cursor-pointer"
        >
          Clear dates
        </button>
      </div>
    </div>
  );
};
