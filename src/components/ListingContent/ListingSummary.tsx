import React from 'react';

interface ListingSummaryProps {
  propertyType: string;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

export const ListingSummary: React.FC<ListingSummaryProps> = ({
  propertyType,
  maxGuests,
  bedrooms,
  beds,
  bathrooms,
}) => {
  return (
    <div className="pb-2">
      <h2 className="text-[22px] font-semibold text-neutral-900 leading-snug">
        {propertyType}
      </h2>
      <div className="text-base text-neutral-700 mt-1 font-normal">
        {maxGuests} guests · {bedrooms} bedroom · {beds} bed · {bathrooms} bathroom
      </div>
    </div>
  );
};
