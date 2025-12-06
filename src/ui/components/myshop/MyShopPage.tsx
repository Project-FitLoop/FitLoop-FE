"use client";

import { useEffect, useState } from "react";
import CouponRegisterForm from "@/ui/components/coupon/CouponRegisterForm";

export default function MyShopPage() {
  const [couponModalOpen, setCouponModalOpen] = useState(false);

  useEffect(() => {
    const handler = () => setCouponModalOpen(true);
    window.addEventListener("open-coupon-modal", handler);
    return () => window.removeEventListener("open-coupon-modal", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = couponModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [couponModalOpen]);

  return (
    <div className="relative max-w-md mx-auto min-h-screen flex items-center justify-center bg-white">
      
      <div className="text-center px-6">
        <h1 className="text-[18px] font-semibold mb-2">마이샵 페이지</h1>
        <p className="text-[14px] text-gray-600 leading-relaxed">
          해당 화면은 현재 구현 중입니다.
          <br />
          쿠폰 발행 기능만 임시로 테스트 가능합니다.
        </p>
      </div>

      {couponModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-[400px] bg-white rounded-2xl p-6 max-h-[85vh] overflow-y-auto scrollbar-hide">
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-semibold">쿠폰 발행</h2>
              <button
                onClick={() => setCouponModalOpen(false)}
                className="text-[22px] leading-none"
              >
                ✕
              </button>
            </div>

            <CouponRegisterForm
              onSubmitSuccess={() => setCouponModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
