"use client";

import CouponRegisterForm from "@/ui/components/coupon/CouponRegisterForm";

const CouponRegisterPage = () => {
  return (
    <div
      id="scrollable-container"
      className="scrollbar-hide"
      style={{
        height: "100vh",
        overflowY: "auto",
        scrollBehavior: "smooth",
      }}
    >
      <div
        style={{ width: "100%", maxWidth: "400px" }}
        className="mx-auto relative px-4 pb-10"
      >
        <CouponRegisterForm />
      </div>
    </div>
  );
};

export default CouponRegisterPage;
