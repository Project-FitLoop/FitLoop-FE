'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchOverlay from '@/components/SearchOverlay';

export default function SearchHeader() {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  const handleCloseSearch = () => {
    setIsSearching(false);
  };

  return (
    <>
      {/* 기본 상단 헤더 */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#FAFAFA] z-50 relative">
        <Link href="/main/home">
          <div className="h-[36px] overflow-hidden flex items-center ml-[-30px] mt-2 cursor-pointer">
            <Image
              src="/logo.svg"
              alt="로고"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[160px] h-[56px] object-cover"
              priority
            />
          </div>
        </Link>
        <div className="flex space-x-4 items-center">
          <button onClick={handleSearchClick}>
            <Image src="/assets/product-tab/search.svg" alt="검색" width={24} height={24} />
          </button>
          <Link href="/cart">
            <Image src="/assets/product-tab/shopping-bag.svg" alt="장바구니" width={24} height={24} />
          </Link>
        </div>
      </div>

      {isSearching && <SearchOverlay onClose={handleCloseSearch} />}
    </>
  );
}
