'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/ui/components/common/ProductCard';
import MainTabBar from '@/ui/components/main/MainTabBar';
import { fetchSearchResults } from '@/services/api/searchApi';
import { ProductResponse } from '@/services/api/productApi';
import SearchOverlay from '@/components/SearchOverlay';

export default function SearchResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [results, setResults] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(keyword);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await fetchSearchResults(keyword);
        setResults(data);
      } catch (error) {
        console.error('검색 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    if (keyword.trim().length >= 2) {
      fetch();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [keyword]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim().length >= 2) {
      router.push(`/search?keyword=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full max-w-[400px] mx-auto bg-white min-h-screen flex flex-col">
      {/* 커스텀 헤더 */}
      <div className="sticky top-0 bg-white px-4 py-3 z-50 border-b border-gray-200 flex items-center gap-2">
        <button onClick={handleBack}>
          <Image src="/assets/common/left-arrow.svg" alt="뒤로가기" width={24} height={24} />
        </button>
        <div className="flex-1 bg-[#f5f5f5] rounded-full px-4 py-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="상품명을 입력하세요"
            className="w-full bg-transparent outline-none text-sm text-gray-700"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsSearching(true)}>
            <Image src="/assets/product-tab/search.svg" alt="검색" width={24} height={24} />
          </button>
          <Link href="/cart">
            <Image src="/assets/product-tab/shopping-bag.svg" alt="장바구니" width={24} height={24} />
          </Link>
        </div>
      </div>

      {/* 검색 오버레이 */}
      {isSearching && <SearchOverlay onClose={() => setIsSearching(false)} />}

      {/* 본문 영역 */}
      <main className="flex-1 overflow-y-auto px-4 pb-24 scrollbar-hide">
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <Image
              src="/assets/common/loading-spinner.svg"
              alt="로딩 중"
              width={40}
              height={40}
              className="animate-spin"
            />
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col justify-center items-center text-center mt-20 text-gray-500">
            <Image
              src="/assets/common/no-result.png"
              alt="검색 결과 없음"
              width={200}
              height={200}
              className="mb-4"
            />
            <p className="text-sm font-medium">검색 결과가 없습니다</p>
            <p className="text-xs mt-1">다른 키워드로 다시 검색해보세요.</p>
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-500 mt-3">
              <span className="font-semibold text-black">{results.length}</span>건의 검색 결과
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 mt-4">
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  variant="search"
                  product={{
                    id: product.id,
                    name: product.name,
                    imageUrl: product.imageUrls?.[0] ?? '/assets/product/no-image.png',
                    price: product.free ? '무료나눔' : `${product.price.toLocaleString()}원`,
                    tags: product.tags ?? [],
                    likedByMe: product.likedByMe,
                    likeCount: product.likeCount,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <MainTabBar />
    </div>
  );
}
