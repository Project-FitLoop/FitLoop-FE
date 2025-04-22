"use client";

import Image from "next/image";
import BackButton from "@/ui/components/common/BackButton";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <BackButton />
        <span className="text-lg text-black font-medium">상품</span>
      </div>

      <div className="flex space-x-4">
        <button>
          <Image src="/assets/product-tab/search.svg" alt="검색" width={20} height={20} />
        </button>
        <button>
          <Image src="/assets/product-tab/shopping-bag.svg" alt="장바구니" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
