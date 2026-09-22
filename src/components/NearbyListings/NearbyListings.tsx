import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

interface NearbyListingItem {
  id: string;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
}

const PAGE_SIZE = 5;

const allListings: NearbyListingItem[] = [
  {
    id: 'nl-1',
    title: 'Beautiful Studio with a view to die for',
    price: 23600,
    rating: 4.91,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nl-2',
    title: 'NAQAB - 1bhk with private pool',
    price: 42218,
    rating: 4.95,
    imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nl-3',
    title: 'Greentique Luxury Flat with plunge pool, Calangute',
    price: 44506,
    rating: 4.94,
    imageUrl: 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nl-4',
    title: 'The Tropical Studio | 5 mins to Beach',
    price: 22824,
    rating: 4.96,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nl-5',
    title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
    price: 39942,
    rating: 4.95,
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nl-6',
    title: 'Ocean Breeze Jacuzzi Penthouse Suite',
    price: 35800,
    rating: 4.93,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nl-7',
    title: 'Candolim Sunset Luxury Villa with Private Pool',
    price: 44900,
    rating: 4.98,
    imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nl-8',
    title: 'Tropical Garden 2BHK Enclave with Resort Pool',
    price: 30500,
    rating: 4.92,
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nl-9',
    title: 'Portuguese Heritage Studio, Candolim',
    price: 21750,
    rating: 4.89,
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nl-10',
    title: 'Seaview Penthouse with Infinity Pool',
    price: 52000,
    rating: 4.97,
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
  },
];

const totalPages = Math.ceil(allListings.length / PAGE_SIZE); // 2

export const NearbyListings: React.FC = () => {
  const [page, setPage] = useState(1);

  const pageListings = allListings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="py-10 border-t border-neutral-200">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[22px] font-semibold text-neutral-900">More stays nearby</h2>

        {/* Pagination control */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-700 font-normal">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center transition cursor-pointer
              ${page === 1 ? 'text-neutral-300 border-neutral-200 cursor-default' : 'text-neutral-700 hover:border-neutral-500'}`}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4 stroke-[1.8]" />
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center transition cursor-pointer
              ${page === totalPages ? 'text-neutral-300 border-neutral-200 cursor-default' : 'text-neutral-700 hover:border-neutral-500'}`}
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4 stroke-[1.8]" />
          </button>
        </div>
      </div>

      {/* 5-card horizontal row */}
      <div className="grid grid-cols-5 gap-4">
        {pageListings.map((item) => (
          <div key={item.id} className="group cursor-pointer flex flex-col gap-2">
            {/* Photo */}
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Title */}
            <div className="text-sm font-semibold text-neutral-900 leading-snug line-clamp-2">
              {item.title}
            </div>

            {/* Price + Rating */}
            <div className="flex items-center gap-1.5 text-sm">
              <span className="font-semibold text-neutral-900">₹{formatPrice(item.price)}</span>
              <Star className="w-3 h-3 fill-neutral-900 text-neutral-900 ml-1" />
              <span className="text-neutral-700">{item.rating.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
