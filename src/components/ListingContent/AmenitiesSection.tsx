import React from 'react';
import {
  UtensilsCrossed,
  Wifi,
  Laptop,
  Car,
  Waves,
  Bath,
  Dog,
  Camera,
  BellOff,
  Flame,
} from 'lucide-react';
import type { AmenityItem } from '../../types/listing';
import { Button } from '../ui/Button';

interface AmenitiesSectionProps {
  amenities: AmenityItem[];
  onShowAllAmenities: () => void;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  amenities,
  onShowAllAmenities,
}) => {
  // Map icons
  const renderIcon = (iconName: string, available: boolean) => {
    const iconClass = 'w-6 h-6 stroke-[1.5] text-neutral-800 shrink-0';

    if (!available) {
      return (
        <div className="relative inline-flex items-center justify-center shrink-0">
          {iconName === 'ShieldAlert' ? (
            <BellOff className={iconClass} />
          ) : (
            <Flame className={`${iconClass} opacity-60`} />
          )}
          {/* Diagonal strike line */}
          <span className="absolute w-7 h-[1.5px] bg-neutral-800 rotate-45" />
        </div>
      );
    }

    switch (iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className={iconClass} />;
      case 'Wifi':
        return <Wifi className={iconClass} />;
      case 'Laptop':
        return <Laptop className={iconClass} />;
      case 'Car':
        return <Car className={iconClass} />;
      case 'Waves':
        return <Waves className={iconClass} />;
      case 'Bath':
        return <Bath className={iconClass} />;
      case 'Dog':
        return <Dog className={iconClass} />;
      case 'Camera':
        return <Camera className={iconClass} />;
      default:
        return <Wifi className={iconClass} />;
    }
  };

  const heroAmenities = amenities.slice(0, 10);

  return (
    <section id="amenities-section" className="py-8 border-t border-neutral-200">
      <h2 className="text-[22px] font-semibold text-neutral-900 mb-6">
        What this place offers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 max-w-[650px] mb-8">
        {heroAmenities.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 py-1 text-base ${
              !item.available ? 'line-through text-neutral-500' : 'text-neutral-800'
            }`}
          >
            {renderIcon(item.iconName, item.available)}
            <span className="font-normal">{item.name}</span>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="lg"
        onClick={onShowAllAmenities}
      >
        Show all {amenities.length} amenities
      </Button>
    </section>
  );
};
