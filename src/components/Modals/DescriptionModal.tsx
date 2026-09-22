import React from 'react';
import { Modal } from '../ui/Modal';

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: {
    preview: string;
    fullText: string[];
    theSpace: string[];
    guestAccess: string[];
    otherNotes: string[];
  };
}

export const DescriptionModal: React.FC<DescriptionModalProps> = ({
  isOpen,
  onClose,
  description,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="About this space"
      maxWidth="2xl"
      aria-label="About this space modal"
      contentClassName="p-8 space-y-6 text-sm text-neutral-800 leading-relaxed"
    >
      <div className="space-y-3">
        {description.fullText.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="pt-4 border-t border-neutral-100 space-y-3">
        <h3 className="text-base font-bold text-neutral-900">The space</h3>
        {description.theSpace.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="pt-4 border-t border-neutral-100 space-y-3">
        <h3 className="text-base font-bold text-neutral-900">Guest access</h3>
        {description.guestAccess.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="pt-4 border-t border-neutral-100 space-y-3">
        <h3 className="text-base font-bold text-neutral-900">Other things to note</h3>
        {description.otherNotes.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </Modal>
  );
};
