import { useState } from 'react';
import { listingData } from './data/listing';
import { useScrollPosition } from './hooks/useScrollPosition';

// Header components
import { Header } from './components/Header/Header';
import { StickySubNav } from './components/Header/StickySubNav';

// Hero components
import { ListingHeader } from './components/ListingHero/ListingHeader';
import { PhotoGrid } from './components/ListingHero/PhotoGrid';

// Content components
import { ListingSummary } from './components/ListingContent/ListingSummary';
import { GuestFavouriteBadge } from './components/ListingContent/GuestFavouriteBadge';
import { HostSummary } from './components/ListingContent/HostSummary';
import { ListingHighlights } from './components/ListingContent/ListingHighlights';
import { ListingDescription } from './components/ListingContent/ListingDescription';
import { SleepingArrangements } from './components/ListingContent/SleepingArrangements';
import { AmenitiesSection } from './components/ListingContent/AmenitiesSection';

// Reservation components
import { DiscountBanner } from './components/Reservation/DiscountBanner';
import { ReservationCard } from './components/Reservation/ReservationCard';
import type { GuestCount } from './components/Reservation/GuestPickerDropdown';

// Calendar
import { DualMonthCalendar } from './components/Calendar/DualMonthCalendar';

// Sections
import { ReviewsSection } from './components/Reviews/ReviewsSection';
import { LocationSection } from './components/Location/LocationSection';
import { HostSection } from './components/Host/HostSection';
import { ThingsToKnow } from './components/ThingsToKnow/ThingsToKnow';
import { NearbyListings } from './components/NearbyListings/NearbyListings';


// Modals
import { PhotoTourModal } from './components/PhotoTour/PhotoTourModal';
import { LightboxViewer } from './components/Lightbox/LightboxViewer';
import { AmenitiesModal } from './components/Modals/AmenitiesModal';
import { ReviewsModal } from './components/Modals/ReviewsModal';
import { ShareModal } from './components/Modals/ShareModal';

export function App() {
  // Date selection state: default Oct 18 - Oct 23, 2026 (5 nights)
  const [checkIn, setCheckIn] = useState<Date | null>(new Date(2026, 9, 18));
  const [checkOut, setCheckOut] = useState<Date | null>(new Date(2026, 9, 23));

  // Guests state: default 2 guests
  const [guests, setGuests] = useState<GuestCount>({
    adults: 2,
    children: 0,
    infants: 0,
    pets: 0,
  });

  // Discount claim state
  const [isDiscountClaimed, setIsDiscountClaimed] = useState(false);

  // Modals state
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Scroll position & sticky sub-nav
  const { isPastHero, activeSection } = useScrollPosition(520);

  // Nights calculation
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 5;
    const diff = Math.round(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff > 0 ? diff : 5;
  };

  const nights = calculateNights();
  const rawBase = Math.round(listingData.pricePerNight * nights);
  const discountAmt = isDiscountClaimed
    ? Math.round((rawBase * listingData.discountPercent) / 100)
    : 0;
  const currentTotalPrice = rawBase - discountAmt;

  // Handlers
  const handleOpenTour = (index = 0) => {
    setLightboxIndex(index);
    setIsPhotoTourOpen(true);
  };

  const handlePhotoClickInTour = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleDatesSelect = (inDate: Date | null, outDate: Date | null) => {
    setCheckIn(inDate);
    setCheckOut(outDate);
  };

  const handleReserveClick = () => {
    const card = document.getElementById('reservation-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans">
      {/* Top Global Header */}
      <Header />

      {/* Sticky Sub Navigation Header */}
      <StickySubNav
        isVisible={isPastHero}
        activeSection={activeSection}
        totalPrice={currentTotalPrice}
        nightsCount={nights}
        rating={listingData.rating}
        reviewsCount={listingData.reviewsCount}
        onReserveClick={handleReserveClick}
      />

      {/* Main Listing Body */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 lg:px-10">
        {/* Listing Header */}
        <ListingHeader
          title={listingData.title}
          onShareClick={() => setIsShareModalOpen(true)}
        />

        {/* Hero Photo Bento Grid */}
        <PhotoGrid
          photos={listingData.photos}
          onOpenTour={handleOpenTour}
        />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative">
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <ListingSummary
              propertyType={listingData.propertyType}
              maxGuests={listingData.maxGuests}
              bedrooms={listingData.bedrooms}
              beds={listingData.beds}
              bathrooms={listingData.bathrooms}
            />

            <GuestFavouriteBadge
              rating={listingData.rating}
              reviewsCount={listingData.reviewsCount}
              tagline={listingData.guestFavouriteTagline}
              onReviewsClick={() => setIsReviewsModalOpen(true)}
            />

            <HostSummary host={listingData.host} />

            <ListingHighlights />

            <ListingDescription
              preview={listingData.description.preview}
              fullText={listingData.description.fullText}
            />

            <SleepingArrangements
              arrangements={listingData.sleepingArrangements}
            />

            <AmenitiesSection
              amenities={listingData.amenities}
              onShowAllAmenities={() => setIsAmenitiesModalOpen(true)}
            />

            <DualMonthCalendar
              checkIn={checkIn}
              checkOut={checkOut}
              onSelectDates={handleDatesSelect}
              city={listingData.city}
            />
          </div>

          {/* Right Column (Sticky Reservation Card) */}
          <div className="lg:col-span-5 xl:col-span-4 relative">
            <DiscountBanner
              discountPercent={listingData.discountPercent}
              onClaim={() => setIsDiscountClaimed(true)}
            />

            <ReservationCard
              pricePerNight={listingData.pricePerNight}
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
              maxGuests={listingData.maxGuests}
              cleaningFee={listingData.cleaningFee}
              serviceFee={listingData.serviceFee}
              isDiscountApplied={isDiscountClaimed}
              discountPercent={listingData.discountPercent}
              onSelectDatesClick={() => {
                const cal = document.getElementById('amenities-section');
                cal?.scrollIntoView({ behavior: 'smooth' });
              }}
              onGuestsChange={setGuests}
            />
          </div>
        </div>

        {/* Full-width lower sections */}
        <ReviewsSection
          rating={listingData.rating}
          reviewsCount={listingData.reviewsCount}
          ratingsBreakdown={listingData.ratingsBreakdown}
          reviews={listingData.reviews}
          onShowAllReviews={() => setIsReviewsModalOpen(true)}
        />

        <LocationSection location={listingData.location} />

        <HostSection
          host={listingData.host}
          rating={listingData.rating}
          reviewsCount={listingData.reviewsCount}
        />

        <ThingsToKnow
          houseRules={listingData.houseRules}
          safetyAndProperty={listingData.safetyAndProperty}
          cancellationPolicy={listingData.cancellationPolicy}
        />

        <NearbyListings />
      </main>



      {/* Modals & Overlays */}
      <PhotoTourModal
        isOpen={isPhotoTourOpen}
        photos={listingData.photos}
        onClose={() => setIsPhotoTourOpen(false)}
        onPhotoClick={handlePhotoClickInTour}
        onShareClick={() => setIsShareModalOpen(true)}
      />

      <LightboxViewer
        isOpen={isLightboxOpen}
        photos={listingData.photos}
        currentIndex={lightboxIndex}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={setLightboxIndex}
        onGridClick={() => {
          setIsLightboxOpen(false);
          setIsPhotoTourOpen(true);
        }}
        onShare={() => setIsShareModalOpen(true)}
      />

      <AmenitiesModal
        isOpen={isAmenitiesModalOpen}
        amenities={listingData.amenities}
        onClose={() => setIsAmenitiesModalOpen(false)}
      />



      <ReviewsModal
        isOpen={isReviewsModalOpen}
        rating={listingData.rating}
        reviewsCount={listingData.reviewsCount}
        ratingsBreakdown={listingData.ratingsBreakdown}
        reviews={listingData.reviews}
        onClose={() => setIsReviewsModalOpen(false)}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        title={listingData.title}
        imageUrl={listingData.photos[0]?.url || ''}
        onClose={() => setIsShareModalOpen(false)}
      />

    </div>
  );
}

export default App;
