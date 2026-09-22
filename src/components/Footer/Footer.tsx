import React from 'react';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F7F7F7] border-t border-neutral-200 mt-16 text-sm text-neutral-600">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12">
        {/* Breadcrumb row */}
        <nav aria-label="Breadcrumbs" className="mb-10 text-xs text-neutral-500 flex items-center gap-2 flex-wrap">
          <a href="#" className="hover:underline text-neutral-700">Airbnb</a>
          <span>›</span>
          <a href="#" className="hover:underline text-neutral-700">India</a>
          <span>›</span>
          <a href="#" className="hover:underline text-neutral-700">Goa</a>
          <span>›</span>
          <a href="#" className="hover:underline text-neutral-700">Candolim</a>
          <span>›</span>
          <span className="text-neutral-900 font-medium">Romantic Jacuzzi 1BHK Candolim | Mirashya UG10</span>
        </nav>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-200">
          <div>
            <h4 className="font-semibold text-neutral-900 text-sm mb-3">Support</h4>
            <ul className="space-y-2.5 text-xs text-neutral-600">
              <li><a href="#" className="hover:underline">Help Centre</a></li>
              <li><a href="#" className="hover:underline">AirCover</a></li>
              <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
              <li><a href="#" className="hover:underline">Disability support</a></li>
              <li><a href="#" className="hover:underline">Cancellation options</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 text-sm mb-3">Hosting</h4>
            <ul className="space-y-2.5 text-xs text-neutral-600">
              <li><a href="#" className="hover:underline">Airbnb your home</a></li>
              <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
              <li><a href="#" className="hover:underline">Hosting resources</a></li>
              <li><a href="#" className="hover:underline">Community forum</a></li>
              <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 text-sm mb-3">Airbnb</h4>
            <ul className="space-y-2.5 text-xs text-neutral-600">
              <li><a href="#" className="hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:underline">New features</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
              <li><a href="#" className="hover:underline">Airbnb.org emergency stays</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 text-sm mb-3">PlayPowerLabs</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Frontend Engineering hiring assignment implementation by candidate. Built with pixel-level precision, React, TypeScript, Tailwind CSS, and Framer Motion.
            </p>
          </div>
        </div>

        {/* Bottom copyright & settings bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
          <div className="flex items-center gap-3 flex-wrap">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">Sitemap</a>
            <span>·</span>
            <a href="#" className="hover:underline">Company details</a>
          </div>

          <div className="flex items-center gap-6 font-semibold text-neutral-800">
            <button className="flex items-center gap-2 hover:underline cursor-pointer">
              <Globe className="w-4 h-4" />
              <span>English (IN)</span>
            </button>
            <button className="hover:underline cursor-pointer">
              ₹ INR
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
