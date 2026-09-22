export interface ListingPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'All' | 'Patio & Jacuzzi' | 'Bedroom' | 'Living Room' | 'Kitchen & Dining' | 'Exterior & Pool';
  alt: string;
}

export interface AmenityItem {
  id: string;
  name: string;
  iconName: string;
  category: string;
  available: boolean;
  description?: string;
}

export interface SleepingArrangement {
  id: string;
  roomName: string;
  bedType: string;
  imageUrl: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  rating: number;
  comment: string;
  stayDuration?: string;
}

export interface HostInfo {
  name: string;
  company: string;
  yearsHosting: number;
  avatarText?: string;
  avatarUrl?: string;
  isSuperhost: boolean;
  responseRate: string;
  responseTime: string;
  bio: string;
  coHosts: string[];
}

export interface ListingData {
  id: string;
  title: string;
  propertyType: string;
  location: string;
  city: string;
  state: string;
  country: string;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  rating: number;
  reviewsCount: number;
  isGuestFavourite: boolean;
  guestFavouriteTagline: string;
  pricePerNight: number;
  currency: string;
  defaultNights: number;
  defaultCheckIn: string; // ISO or YYYY-MM-DD
  defaultCheckOut: string;
  cleaningFee: number;
  serviceFee: number;
  discountPercent: number;
  host: HostInfo;
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
  description: {
    preview: string;
    fullText: string[];
    theSpace: string[];
    guestAccess: string[];
    otherNotes: string[];
  };
  sleepingArrangements: SleepingArrangement[];
  photos: ListingPhoto[];
  amenities: AmenityItem[];
  reviews: ReviewItem[];
  ratingsBreakdown: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
  };
  houseRules: string[];
  safetyAndProperty: string[];
  cancellationPolicy: {
    title: string;
    description: string;
    deadline: string;
  };
}
