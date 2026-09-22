import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface ListingDescriptionProps {
  preview: string;
  fullText?: string[];
  onShowMore?: () => void;
}

export const ListingDescription: React.FC<ListingDescriptionProps> = ({
  preview,
  fullText,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="py-8 border-t border-neutral-200">
      <div className="bg-neutral-100/80 rounded-xl px-4 py-3 mb-6 text-sm text-neutral-800 flex items-center justify-between">
        <span>Some info has been automatically translated.</span>
        <button
          type="button"
          className="font-semibold underline cursor-pointer hover:text-neutral-900"
        >
          Show original
        </button>
      </div>

      {/* Description Text */}
      <div className="text-base text-neutral-800 leading-relaxed font-normal space-y-3">
        {isExpanded && fullText && fullText.length > 0 ? (
          fullText.map((para, i) => <p key={i}>{para}</p>)
        ) : (
          <p>{preview}</p>
        )}
      </div>

      {/* Show more / Show less toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 flex items-center gap-1 font-semibold text-neutral-900 underline underline-offset-4 hover:text-black transition cursor-pointer"
      >
        <span>{isExpanded ? 'Show less' : 'Show more'}</span>
        <ChevronRight
          className={`w-4 h-4 stroke-[2.5] transition-transform ${isExpanded ? 'rotate-90' : ''}`}
        />
      </button>
    </div>
  );
};
