"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
      {/* 뒤로 가기 버튼 */}
      <button
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push("/");
          }
        }}
        className="flex items-center text-lg font-bold text-gray-800"
      >
        <Image src="/assets/product-tab/left-arrow.svg" alt="뒤로 가기" width={20} height={20} className="mr-2" />
        상품
      </button>

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
