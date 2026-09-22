import React from 'react';
import { Search, Globe, Menu } from 'lucide-react';

interface HeaderProps {
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  return (
    <header className="w-full bg-white border-b border-neutral-200 sticky top-0 z-30">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[80px] flex items-center justify-between gap-4">

        {/* ── Left: Airbnb Logo ── */}
        <a
          href="#"
          className="flex items-center shrink-0 focus:outline-none"
          aria-label="Airbnb homepage"
        >
          <img
            src="/images/airbnb-logo.png"
            alt="Airbnb"
            className="h-[34px] w-auto object-contain select-none"
          />
        </a>

        {/* ── Center: Search Pill ── */}
        <button
          type="button"
          onClick={onSearchClick}
          className="flex items-center border border-neutral-300 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow bg-white text-left cursor-pointer"
          aria-label="Search homes"
        >
          {/* Building thumbnail before Anywhere */}
          <div className="flex items-center gap-2 pl-3 pr-3 py-[9px] border-r border-neutral-200">
            <span className="w-[26px] h-[26px] rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-[#f5e6d0]">
              <svg viewBox="0 0 28 28" className="w-[22px] h-[22px]" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="28" height="28" fill="#e8d5b0" />
                <rect x="4" y="12" width="20" height="13" fill="#c4842a" rx="1" />
                <polygon points="2,13 14,4 26,13" fill="#a06020" />
                <rect x="11" y="18" width="6" height="7" fill="#7a4010" rx="0.5" />
                <rect x="5" y="15" width="5" height="4" fill="#f0e0b0" rx="0.5" />
                <rect x="18" y="15" width="5" height="4" fill="#f0e0b0" rx="0.5" />
              </svg>
            </span>
            <span className="text-sm font-semibold text-neutral-800 whitespace-nowrap">Anywhere</span>
          </div>

          {/* Anytime */}
          <div className="px-4 py-[9px] border-r border-neutral-200">
            <span className="text-sm font-semibold text-neutral-800 whitespace-nowrap">Anytime</span>
          </div>

          {/* Add guests + pink search */}
          <div className="flex items-center gap-2 pl-4 pr-[6px] py-[6px]">
            <span className="text-sm text-neutral-500 whitespace-nowrap">Add guests</span>
            <div className="bg-[#FF385C] text-white p-[8px] rounded-full flex items-center justify-center">
              <Search className="w-[14px] h-[14px] stroke-[2.5]" />
            </div>
          </div>
        </button>

        {/* ── Right: Become a host · Globe · Menu ── */}
        <div className="flex items-center gap-0 shrink-0">
          <button
            type="button"
            className="hidden sm:block text-sm font-semibold text-neutral-800 px-4 py-2.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            Become a host
          </button>

          <button
            type="button"
            className="p-2.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-700 cursor-pointer"
            aria-label="Language and currency"
          >
            <Globe className="w-[18px] h-[18px] stroke-[1.8]" />
          </button>

          <div className="ml-1">
            <button
              type="button"
              className="flex items-center border border-neutral-300 rounded-full py-[8px] px-[12px] hover:shadow-md transition-shadow cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-[16px] h-[16px] text-neutral-700 stroke-[1.8]" />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
