"use client";

import Image from "next/image";
import BackButton from "@/ui/components/common/BackButton";
import { usePathname, useSearchParams } from "next/navigation";
import { getCategoryInfoFromUrl } from "@/data/getCategoryInfo";

const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const info = getCategoryInfoFromUrl(pathname, searchParams);

  if (!info) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 shadow-md" style={{backgroundColor: "var(--bg-white)"}}>
      <div className="flex items-center space-x-2">
        <BackButton />
        <span className="text-lg font-medium" style={{color: "var( --text-black)"}}>{info.categoryName}</span>
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