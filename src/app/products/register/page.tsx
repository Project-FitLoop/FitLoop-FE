"use client";

import ProductRegisterForm from "@/ui/components/product/ProductRegisterForm";

const ProductRegisterPage = () => {
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
      {/* 가운데 width 400px 고정 영역 */}
      <div
        style={{ width: "100%", maxWidth: "400px" }}
        className="mx-auto relative px-4 pb-10"
      >
        <ProductRegisterForm />
      </div>
    </div>
  );
};

export default ProductRegisterPage;
