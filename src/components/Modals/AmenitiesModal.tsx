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
  Wind,
  Sparkles,
  Droplets,
  Tag,
  Square,
  Tv,
  Fan,
  Shield,
  Cpu,
  Coffee,
  Utensils,
  Sun,
  Home,
  MapPin,
  Calendar,
  Key,
  Archive,
  BookOpen,
} from 'lucide-react';
import type { AmenityItem } from '../../types/listing';
import { Modal } from '../ui/Modal';

interface AmenitiesModalProps {
  isOpen: boolean;
  amenities: AmenityItem[];
  onClose: () => void;
}

const getIcon = (iconName: string, available: boolean) => {
  const iconClass = 'w-6 h-6 stroke-[1.5] text-neutral-800 shrink-0';
  const fadedClass = 'w-6 h-6 stroke-[1.5] text-neutral-400 shrink-0';

  if (!available) {
    return (
      <div className="relative inline-flex items-center justify-center shrink-0">
        {iconName === 'ShieldAlert' ? (
          <BellOff className={fadedClass} />
        ) : (
          <Flame className={fadedClass} />
        )}
        <span className="absolute w-7 h-[1.5px] bg-neutral-400 rotate-45" />
      </div>
    );
  }

  const cls = iconClass;
  switch (iconName) {
    case 'UtensilsCrossed': return <UtensilsCrossed className={cls} />;
    case 'Wifi': return <Wifi className={cls} />;
    case 'Laptop': return <Laptop className={cls} />;
    case 'Car': return <Car className={cls} />;
    case 'Waves': return <Waves className={cls} />;
    case 'Bath': return <Bath className={cls} />;
    case 'Dog': return <Dog className={cls} />;
    case 'Camera': return <Camera className={cls} />;
    case 'Flame': return <Flame className={cls} />;
    case 'Wind': return <Wind className={cls} />;
    case 'Sparkles': return <Sparkles className={cls} />;
    case 'Droplets': return <Droplets className={cls} />;
    case 'Tag': return <Tag className={cls} />;
    case 'Square': return <Square className={cls} />;
    case 'Tv': return <Tv className={cls} />;
    case 'Fan': return <Fan className={cls} />;
    case 'Shield': return <Shield className={cls} />;
    case 'Cpu': return <Cpu className={cls} />;
    case 'Coffee': return <Coffee className={cls} />;
    case 'Utensils': return <Utensils className={cls} />;
    case 'Sun': return <Sun className={cls} />;
    case 'Home': return <Home className={cls} />;
    case 'MapPin': return <MapPin className={cls} />;
    case 'Calendar': return <Calendar className={cls} />;
    case 'Key': return <Key className={cls} />;
    case 'Archive': return <Archive className={cls} />;
    case 'BookOpen': return <BookOpen className={cls} />;
    default: return <Wifi className={cls} />;
  }
};

export const AmenitiesModal: React.FC<AmenitiesModalProps> = ({
  isOpen,
  amenities,
  onClose,
}) => {
  // Group by category
  const categories = Array.from(new Set(amenities.map((item) => item.category)));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="What this place offers"
      maxWidth="2xl"
      aria-label="All amenities modal"
    >
      {/* Content list - no search bar */}
      <div className="px-8 py-6 space-y-8">
        {categories.map((category) => {
          const items = amenities.filter((i) => i.category === category);
          return (
            <div key={category} className="space-y-1">
              <h3 className="font-bold text-lg text-neutral-900 capitalize border-b border-neutral-200 pb-3 mb-1">
                {category}
              </h3>
              <div className="divide-y divide-neutral-100">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex items-start gap-4">
                    {getIcon(item.iconName, item.available)}
                    <div>
                      <div
                        className={`text-base font-normal ${
                          !item.available ? 'line-through text-neutral-400' : 'text-neutral-900'
                        }`}
                      >
                        {item.name}
                      </div>
                      {item.description && (
                        <div className="text-xs text-neutral-500 mt-0.5">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
