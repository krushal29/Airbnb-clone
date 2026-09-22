import { useState, useEffect } from 'react';

export function useScrollPosition(threshold = 550) {
  const [scrollY, setScrollY] = useState(0);
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<'photos' | 'amenities' | 'reviews' | 'location'>('photos');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsPastHero(currentScrollY > threshold);

      // Section tracking for sticky sub-nav
      const amenitiesEl = document.getElementById('amenities-section');
      const reviewsEl = document.getElementById('reviews-section');
      const locationEl = document.getElementById('location-section');

      const offset = 180;
      if (locationEl && locationEl.getBoundingClientRect().top <= offset) {
        setActiveSection('location');
      } else if (reviewsEl && reviewsEl.getBoundingClientRect().top <= offset) {
        setActiveSection('reviews');
      } else if (amenitiesEl && amenitiesEl.getBoundingClientRect().top <= offset) {
        setActiveSection('amenities');
      } else {
        setActiveSection('photos');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { scrollY, isPastHero, activeSection };
}
