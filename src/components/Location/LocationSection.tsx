import React, { useState } from 'react';
import { Plus, Minus, Home } from 'lucide-react';

interface LocationSectionProps {
  location: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  location = 'Candolim, Goa, India',
}) => {
  const [zoom, setZoom] = useState(1);

  return (
    <section id="location-section" className="py-10 border-t border-neutral-200">
      <h2 className="text-[22px] font-semibold text-neutral-900 mb-2">
        Where you'll be
      </h2>
      <div className="text-base text-neutral-700 mb-6">{location}</div>

      {/* Airbnb-style illustrated map */}
      <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-neutral-200 shadow-inner mb-4"
        style={{ background: '#e8e0d5' }}
      >
        <svg
          className="w-full h-full transition-transform duration-300"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Arabian Sea */}
          <rect x="0" y="0" width="260" height="500" fill="#b3d4f5" />
          <path
            d="M 250 0 C 265 80 270 200 255 320 S 270 430 260 500 L 0 500 L 0 0 Z"
            fill="#a3c8f0"
          />

          {/* Thin sandy beach strip */}
          <path
            d="M 250 0 C 265 80 270 200 255 320 S 270 430 260 500 L 285 500 C 278 430 280 310 278 200 S 278 80 265 0 Z"
            fill="#e8d9a8"
          />

          {/* Main land - beige/tan */}
          <rect x="275" y="0" width="725" height="500" fill="#ede8df" />

          {/* Green park/forest patches */}
          <ellipse cx="450" cy="100" rx="60" ry="40" fill="#c8ddb0" opacity="0.7" />
          <ellipse cx="750" cy="260" rx="70" ry="50" fill="#c8ddb0" opacity="0.7" />
          <ellipse cx="620" cy="400" rx="50" ry="35" fill="#c8ddb0" opacity="0.6" />

          {/* Coastal Highway - Fort Aguada Road */}
          <path d="M 330 0 Q 360 180 390 340 T 450 500" fill="none" stroke="#ffffff" strokeWidth="14" />
          <path d="M 330 0 Q 360 180 390 340 T 450 500" fill="none" stroke="#f5d87a" strokeWidth="7" />

          {/* Secondary roads */}
          <line x1="340" y1="150" x2="900" y2="170" stroke="#ffffff" strokeWidth="9" />
          <line x1="375" y1="270" x2="950" y2="255" stroke="#ffffff" strokeWidth="9" />
          <line x1="410" y1="390" x2="940" y2="380" stroke="#ffffff" strokeWidth="8" />

          {/* Grid streets */}
          <line x1="500" y1="80" x2="510" y2="460" stroke="#ffffff" strokeWidth="5" />
          <line x1="620" y1="60" x2="635" y2="480" stroke="#ffffff" strokeWidth="5" />
          <line x1="750" y1="90" x2="765" y2="475" stroke="#ffffff" strokeWidth="5" />
          <line x1="870" y1="110" x2="880" y2="470" stroke="#ffffff" strokeWidth="5" />

          {/* Labels */}
          <text x="80" y="250" fill="#5a8fc0" fontSize="14" fontWeight="bold" opacity="0.7" textAnchor="middle">
            ARABIAN
          </text>
          <text x="80" y="270" fill="#5a8fc0" fontSize="14" fontWeight="bold" opacity="0.7" textAnchor="middle">
            SEA
          </text>
          <text x="240" y="350" fill="#9a7c3c" fontSize="11" fontWeight="bold" transform="rotate(-80 240 350)" opacity="0.8">
            CANDOLIM BEACH
          </text>
          <text x="560" y="175" fill="#888" fontSize="11" fontWeight="600">
            Fort Aguada Rd
          </text>
          <text x="680" y="270" fill="#666" fontSize="12" fontWeight="bold">
            Candolim, Goa
          </text>
        </svg>

        {/* Airbnb-style location marker — black circle with house icon */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
          }}
        >
          {/* Two overlapping translucent green radius circles */}
          <div className="absolute w-48 h-48 rounded-full bg-[#c8ddb0]/40 border border-[#a0c080]/30" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          <div className="absolute w-28 h-28 rounded-full bg-[#b0cc90]/40 border border-[#90b060]/30" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

          {/* Black house pin */}
          <div className="relative z-10 w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-lg">
            <Home className="w-5 h-5" />
          </div>
        </div>

        {/* Zoom controls */}
        <div className="absolute right-4 top-4 flex flex-col bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden z-10">
          <button
            onClick={() => setZoom((prev) => Math.min(prev + 0.2, 2.0))}
            className="p-2.5 hover:bg-neutral-100 text-neutral-700 transition cursor-pointer border-b border-neutral-200"
            aria-label="Zoom in"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((prev) => Math.max(prev - 0.2, 0.6))}
            className="p-2.5 hover:bg-neutral-100 text-neutral-700 transition cursor-pointer"
            aria-label="Zoom out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Below map text */}
      <p className="text-sm text-neutral-600 mb-6">
        Exact location will be provided after booking.
      </p>

      {/* Neighbourhood information */}
      <div className="max-w-3xl text-sm text-neutral-800 leading-relaxed space-y-3">
        <p className="font-semibold text-base text-neutral-900">
          Neighbourhood highlights
        </p>
        <p>
          Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.
        </p>
        <p>
          Situated in the heart of Candolim, Amor De Goa offers the perfect balance between vibrant holiday energy and serene coastal retreat. You are just a short 10-minute stroll from Candolim Beach, lined with watersports and famous shacks like Calamari Bathe & Binge.
        </p>
        <p>
          Supermarkets, scooter rental outlets, pharmacies, and popular eateries (including Fisherman's Cove and Tuscany Gardens) are all within a 5-minute walk.
        </p>
      </div>
    </section>
  );
};
