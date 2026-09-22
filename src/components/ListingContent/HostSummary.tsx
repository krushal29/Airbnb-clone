import React from 'react';
import type { HostInfo } from '../../types/listing';

interface HostSummaryProps {
  host: HostInfo;
}

export const HostSummary: React.FC<HostSummaryProps> = ({ host }) => {
  return (
    <div className="py-5 border-t border-neutral-200 flex items-center gap-4">
      {/* Circle dark green avatar */}
      <div className="w-12 h-12 rounded-full bg-[#1b3d2f] text-white flex items-center justify-center font-bold text-[11px] tracking-wider shrink-0 shadow-sm">
        {host.avatarText || host.name.substring(0, 2).toUpperCase()}
      </div>

      <div>
        <div className="text-base font-semibold text-neutral-900">
          Hosted by {host.name}
        </div>
        <div className="text-sm text-neutral-500">
          {host.yearsHosting} years hosting
        </div>
      </div>
    </div>
  );
};
