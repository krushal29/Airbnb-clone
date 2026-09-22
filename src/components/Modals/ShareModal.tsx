import React, { useState } from 'react';
import { Copy, Check, MessageCircle, Mail, Send, Share2 } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  imageUrl,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share this place"
      maxWidth="lg"
      aria-label="Share listing modal"
      contentClassName="p-6 space-y-6"
    >
      {/* Preview Card */}
      <div className="flex items-center gap-4 p-3 rounded-2xl border border-neutral-200 bg-neutral-50/50">
        <img
          src={imageUrl}
          alt="Listing preview"
          className="w-16 h-16 rounded-xl object-cover bg-neutral-200"
        />
        <div className="text-sm font-semibold text-neutral-900 line-clamp-2">
          {title}
        </div>
      </div>

      {/* Share options grid */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 active:bg-neutral-100 transition text-sm font-medium text-neutral-800 cursor-pointer text-left"
        >
          {copied ? (
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <Copy className="w-5 h-5 text-neutral-700 shrink-0" />
          )}
          <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 active:bg-neutral-100 transition text-sm font-medium text-neutral-800 cursor-pointer text-left"
        >
          <MessageCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>WhatsApp</span>
        </button>

        {/* Facebook SVG */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 active:bg-neutral-100 transition text-sm font-medium text-neutral-800 cursor-pointer text-left"
        >
          <svg className="w-5 h-5 text-[#1877F2] fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Facebook</span>
        </button>

        {/* Messenger / Telegram / Messages */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 active:bg-neutral-100 transition text-sm font-medium text-neutral-800 cursor-pointer text-left"
        >
          <Send className="w-5 h-5 text-sky-500 shrink-0" />
          <span>Messenger</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 active:bg-neutral-100 transition text-sm font-medium text-neutral-800 cursor-pointer text-left"
        >
          <Mail className="w-5 h-5 text-neutral-600 shrink-0" />
          <span>Email</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 active:bg-neutral-100 transition text-sm font-medium text-neutral-800 cursor-pointer text-left"
        >
          <Share2 className="w-5 h-5 text-neutral-600 shrink-0" />
          <span>More options</span>
        </button>
      </div>
    </Modal>
  );
};
