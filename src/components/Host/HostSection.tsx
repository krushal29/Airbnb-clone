import React, { useState } from 'react';
import { Award, ShieldCheck, MessageSquare, Check } from 'lucide-react';
import type { HostInfo } from '../../types/listing';

interface HostSectionProps {
  host: HostInfo;
  rating: number;
  reviewsCount: number;
}

export const HostSection: React.FC<HostSectionProps> = ({
  host,
  rating,
  reviewsCount,
}) => {
  const [messageSent, setMessageSent] = useState(false);

  return (
    <section className="py-10 border-t border-neutral-200">
      <h2 className="text-[22px] font-semibold text-neutral-900 mb-6">
        Meet your Host
      </h2>

      {/* Host Profile Card */}
      <div className="rounded-3xl border border-neutral-200 p-8 max-w-2xl bg-[#F8F8F8] shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-neutral-200">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-[#1b3d2f] text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-md">
                {host.avatarText || 'MIRASHYA'}
              </div>
              {host.isSuperhost && (
                <div className="absolute -bottom-1 -right-1 bg-[#FF385C] text-white p-1 rounded-full shadow">
                  <Award className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div>
              <div className="text-xl font-bold text-neutral-900 leading-tight">
                {host.name}
              </div>
              <div className="text-sm text-neutral-600 flex items-center gap-1.5 mt-0.5">
                <Award className="w-3.5 h-3.5 text-[#FF385C]" />
                <span className="font-semibold text-neutral-900">Superhost</span>
              </div>
            </div>
          </div>

          {/* Stats pills */}
          <div className="flex items-center gap-6 divide-x divide-neutral-300">
            <div>
              <div className="text-xl font-extrabold text-neutral-900 leading-none">
                {reviewsCount}
              </div>
              <div className="text-[11px] font-semibold text-neutral-500 uppercase mt-1">
                Reviews
              </div>
            </div>
            <div className="pl-6">
              <div className="text-xl font-extrabold text-neutral-900 leading-none">
                {rating.toFixed(2)} ★
              </div>
              <div className="text-[11px] font-semibold text-neutral-500 uppercase mt-1">
                Rating
              </div>
            </div>
            <div className="pl-6">
              <div className="text-xl font-extrabold text-neutral-900 leading-none">
                {host.yearsHosting}
              </div>
              <div className="text-[11px] font-semibold text-neutral-500 uppercase mt-1">
                Years hosting
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Details */}
        <div className="pt-6 space-y-4 text-sm text-neutral-800">
          <p className="leading-relaxed">{host.bio}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm">
            <div>
              <span className="font-semibold text-neutral-900">Response rate: </span>
              <span>{host.responseRate}</span>
            </div>
            <div>
              <span className="font-semibold text-neutral-900">Responds: </span>
              <span>{host.responseTime}</span>
            </div>
          </div>

          {host.coHosts && host.coHosts.length > 0 && (
            <div className="pt-2 text-xs text-neutral-600">
              <span className="font-semibold text-neutral-900">Co-hosts: </span>
              {host.coHosts.join(', ')}
            </div>
          )}

          {/* Message Host button */}
          <div className="pt-4">
            <button
              onClick={() => setMessageSent(true)}
              className="border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white font-semibold text-sm px-6 py-3 rounded-xl transition cursor-pointer flex items-center gap-2 active:scale-[0.98]"
            >
              {messageSent ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Message Prompt Opened</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4" />
                  <span>Message Host</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* AirCover / Payment Safety Notice */}
      <div className="flex items-start gap-4 max-w-xl text-xs text-neutral-600 bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
        <ShieldCheck className="w-6 h-6 text-[#FF385C] shrink-0" />
        <p className="leading-relaxed">
          To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
        </p>
      </div>
    </section>
  );
};
