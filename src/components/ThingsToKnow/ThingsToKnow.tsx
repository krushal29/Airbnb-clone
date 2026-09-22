import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface ThingsToKnowProps {
  houseRules: string[];
  safetyAndProperty: string[];
  cancellationPolicy: {
    title: string;
    description: string;
    deadline: string;
  };
}

export const ThingsToKnow: React.FC<ThingsToKnowProps> = ({
  houseRules,
  safetyAndProperty,
  cancellationPolicy,
}) => {
  const [activeModal, setActiveModal] = useState<'rules' | 'safety' | 'cancellation' | null>(null);

  const modalTitle = {
    rules: 'House rules',
    safety: 'Safety & property',
    cancellation: 'Cancellation policy',
  }[activeModal || 'rules'];

  return (
    <section className="py-10 border-t border-neutral-200">
      <h2 className="text-[22px] font-semibold text-neutral-900 mb-6">
        Things to know
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Col 1: House rules */}
        <div className="space-y-3">
          <div className="font-semibold text-neutral-900 text-base">
            House rules
          </div>
          <div className="space-y-2 text-sm text-neutral-700">
            {houseRules.slice(0, 4).map((rule, i) => (
              <div key={i}>{rule}</div>
            ))}
          </div>
          <button
            onClick={() => setActiveModal('rules')}
            className="flex items-center gap-1 text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:text-black pt-1 cursor-pointer"
          >
            <span>Show more</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Col 2: Safety & property */}
        <div className="space-y-3">
          <div className="font-semibold text-neutral-900 text-base">
            Safety & property
          </div>
          <div className="space-y-2 text-sm text-neutral-700">
            {safetyAndProperty.slice(0, 4).map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>
          <button
            onClick={() => setActiveModal('safety')}
            className="flex items-center gap-1 text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:text-black pt-1 cursor-pointer"
          >
            <span>Show more</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Col 3: Cancellation policy */}
        <div className="space-y-3">
          <div className="font-semibold text-neutral-900 text-base">
            Cancellation policy
          </div>
          <div className="space-y-2 text-sm text-neutral-700 leading-relaxed">
            <div className="font-medium text-neutral-900">
              {cancellationPolicy.title}
            </div>
            <div>{cancellationPolicy.description}</div>
          </div>
          <button
            onClick={() => setActiveModal('cancellation')}
            className="flex items-center gap-1 text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:text-black pt-1 cursor-pointer"
          >
            <span>Show more</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Modal Popup for details */}
      <Modal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={modalTitle}
        maxWidth="lg"
        contentClassName="p-8 space-y-4"
        aria-label={modalTitle}
      >
        {activeModal === 'rules' && (
          <div className="space-y-3 text-sm text-neutral-700">
            {houseRules.map((rule, i) => (
              <div key={i} className="pb-3 border-b border-neutral-100 last:border-b-0">
                {rule}
              </div>
            ))}
          </div>
        )}

        {activeModal === 'safety' && (
          <div className="space-y-3 text-sm text-neutral-700">
            {safetyAndProperty.map((item, i) => (
              <div key={i} className="pb-3 border-b border-neutral-100 last:border-b-0">
                {item}
              </div>
            ))}
          </div>
        )}

        {activeModal === 'cancellation' && (
          <div className="space-y-3 text-sm text-neutral-700 leading-relaxed">
            <p className="font-semibold text-neutral-900 text-base">
              {cancellationPolicy.title}
            </p>
            <p>{cancellationPolicy.description}</p>
            <p className="pt-2 text-neutral-600">
              Full refund up to 48 hours before check-in. If you cancel less than 48 hours before check-in, the first night and service fee are non-refundable.
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
};
