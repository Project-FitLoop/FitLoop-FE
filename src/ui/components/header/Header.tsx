'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchOverlay from '@/components/SearchOverlay';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  const handleCloseSearch = () => {
    setIsSearching(false);
  };

  const handleBack = () => {
    history.back();
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md max-w-[400px] w-full mx-auto">
        <div className="flex items-center space-x-2">
          <button onClick={handleBack}>
            <Image
              src="/assets/common/left-arrow.svg"
              alt="뒤로가기"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </button>
          <span className="text-lg font-semibold text-gray-900">{title}</span>
        </div>

        {/* 오른쪽: 검색 및 장바구니 아이콘 */}
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

export default Header;
