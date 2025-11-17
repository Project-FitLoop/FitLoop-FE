'use client';

import React from 'react';
import WelcomeCouponPage from '@/ui/components/coupon/WelcomeCouponPage';

interface WelcomeCouponModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WelcomeCouponModal({
  open,
  onClose,
}: WelcomeCouponModalProps) {
  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40"
      onClick={handleOverlayClick}
    >
      <div
        className="w-full max-w-[393px] rounded-2xl bg-white shadow-lg flex flex-col"
        style={{ maxHeight: '85vh', overflow: 'hidden' }}
      >
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-100">
          <span className="text-xs text-gray-500">웰컴 쿠폰팩</span>
          <button
            onClick={onClose}
            className="text-xs text-gray-400 px-2 py-1 rounded-full hover:bg-gray-100"
          >
            닫기
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <WelcomeCouponPage mode="modal" />
        </div>
      </div>
    </div>
  );
}
