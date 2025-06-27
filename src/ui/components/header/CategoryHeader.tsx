'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { getCategoryInfoFromUrl } from '@/data/getCategoryInfo';
import SearchOverlay from '@/components/SearchOverlay';

const CategoryHeader = () => {
  const [isSearching, setIsSearching] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const info = getCategoryInfoFromUrl(pathname, searchParams);

  if (!info) return null;

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  const handleCloseSearch = () => {
    setIsSearching(false);
  };

  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-3 shadow-md"
        style={{ backgroundColor: 'var(--bg-white)' }}
      >
        <div className="flex items-center space-x-2">
          <Link href="#" onClick={() => history.back()}>
            <Image
              src="/assets/common/left-arrow.svg"
              alt="뒤로가기"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </Link>
          <span
            className="text-lg font-medium"
            style={{ color: 'var(--text-black)' }}
          >
            {info.categoryName}
          </span>
        </div>

        <div className="flex space-x-4 items-center">
          <button onClick={handleSearchClick}>
            <Image
              src="/assets/product-tab/search.svg"
              alt="검색"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </button>
          <Link href="/cart">
            <Image
              src="/assets/product-tab/shopping-bag.svg"
              alt="장바구니"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>

      {/* 검색 오버레이 */}
      {isSearching && <SearchOverlay onClose={handleCloseSearch} />}
    </>
  );
};

export default CategoryHeader;
