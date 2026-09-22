import React, { useState, useEffect } from 'react';
import { Share, Heart } from 'lucide-react';

interface ListingHeaderProps {
  title: string;
  onShareClick?: () => void;
}

export const ListingHeader: React.FC<ListingHeaderProps> = ({ title, onShareClick }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (message: string) => {
    setToast(message);
    setToastVisible(true);
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (!toastVisible) return;
    const timer = setTimeout(() => setToastVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [toastVisible, toast]);

  const handleShare = () => {
    if (onShareClick) {
      onShareClick();
    } else {
      showToast('Share options');
    }
  };

  const handleSave = () => {
    const nowSaved = !isSaved;
    setIsSaved(nowSaved);
    showToast(nowSaved ? 'Saved to wishlist' : 'Removed from wishlist');
  };

  return (
    <>
      <div className="pt-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title */}
        <h1 className="text-[26px] font-semibold text-neutral-900 tracking-tight leading-8">
          {title}
        </h1>

        {/* Share and Save */}
        <div className="flex items-center gap-4 text-sm font-medium self-start md:self-auto">

          {/* Share button */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 text-neutral-800 underline underline-offset-2 hover:bg-neutral-100 px-2.5 py-1.5 rounded-md transition cursor-pointer"
            aria-label="Share this listing"
          >
            <Share className="w-4 h-4 stroke-[2]" />
            <span>Share</span>
          </button>

          {/* Save / Saved button */}
          <button
            type="button"
            onClick={handleSave}
            className={`flex items-center gap-1.5 underline underline-offset-2 hover:bg-neutral-100 px-2.5 py-1.5 rounded-md transition cursor-pointer font-medium ${
              isSaved ? 'text-[#FF385C]' : 'text-neutral-800'
            }`}
            aria-label={isSaved ? 'Saved to wishlist' : 'Save to wishlist'}
          >
            <Heart
              className={`w-4 h-4 stroke-[2] transition-colors duration-200 ${
                isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-neutral-800'
              }`}
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>

        </div>
      </div>

      {/* ── Bottom-center toast pill ── */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${
          toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="bg-neutral-900 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-xl whitespace-nowrap">
          {toast}
        </div>
      </div>
    </>
  );
};
