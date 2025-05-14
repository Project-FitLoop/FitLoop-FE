'use client';

import { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/ui/components/common/ProductCard';
import { fetchRecentProducts, fetchPopularProducts, ProductResponse } from '@/services/api/productApi';
import KakaoMap from '@/ui/components/map/KakaoMap';

const s3BaseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';
const banners = Array.from({ length: 5 }, (_, i) => `${s3BaseUrl}advertisement_${i + 1}.png`);

export default function MainPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [recentProducts, setRecentProducts] = useState<ProductResponse[]>([]);
  const [popularProducts, setPopularProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadRecentProducts = async () => {
      try {
        const products = await fetchRecentProducts(0, 4);
        setRecentProducts(products);
      } catch (err) {
        console.error('최근 상품 불러오기 실패:', err);
      }
    };
    const loadPopularProducts = async () => {
      try {
        const products = await fetchPopularProducts(0, 10);
        setPopularProducts(products);
      } catch (err) {
        console.error('인기 상품 불러오기 실패:', err);
      }
    };
    loadRecentProducts();
    loadPopularProducts();
  }, []);

  const scrollToTop = () => {
    document.getElementById('scrollable-container')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="scrollable-container"
      className="scrollbar-hide px-4 pb-16"
      style={{
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
        background: 'var(--bg-gray)',
        color: 'var(--foreground)',
      }}
    >
      {/* 광고 배너 */}
      <div className="mt-4 max-h-[250px] overflow-hidden rounded-md" style={{ background: 'var(--bg-white)' }}>
        <Carousel autoplay dots>
          {banners.map((banner, index) => (
            <div key={index}>
              <Image
                src={banner}
                alt={`광고 ${index + 1}`}
                width={400}
                height={250}
                className="w-full h-[200px] object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* 최근 등록된 상품 */}
      <section className="my-6 -mx-4">
        <div className="rounded-md py-4 px-4" style={{ background: 'var(--bg-white)' }}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-semibold">최근 등록된 상품</h2>
            <Link href="/product/recent">
              <Image
                src="/assets/common/left-arrow.svg"
                alt="더보기"
                width={16}
                height={16}
                className="rotate-180 mr-1"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {recentProducts.map((product) => (
              <div key={product.id} className="rounded-md shadow-sm overflow-hidden w-full" style={{ background: 'var(--bg-white)' }}>
                <div className="flex flex-col h-full">
                  <div className="w-full aspect-square overflow-hidden rounded-md">
                    <Image
                      src={
                        !product.imageUrls?.[0] || product.imageUrls[0] === '없음'
                          ? '/assets/product/no-image.png'
                          : product.imageUrls[0]
                      }
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <div className="text-sm font-bold truncate">{product.name}</div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--text-dark-gray)' }}>
                      {product.free ? '무료나눔' : `${product.price.toLocaleString()}원`}
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {(product.tags ?? []).slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="text-[10px] px-1 py-[2px] rounded-full border"
                          style={{
                            background: 'var(--bg-gray)',
                            color: 'var(--text-dark-gray)',
                            borderColor: 'var(--border-light-gray)',
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 인기 상품 */}
      <section className="my-6 -mx-4">
        <div className="rounded-md py-4 px-4" style={{ background: 'var(--bg-white)' }}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-semibold">인기 상품</h2>
            <Link href="/product/popularity">
              <Image
                src="/assets/common/left-arrow.svg"
                alt="더보기"
                width={16}
                height={16}
                className="rotate-180 mr-1"
              />
            </Link>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-3 w-max">
              {popularProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="min-w-[160px] max-w-[160px] flex-shrink-0 shadow-sm"
                  style={{ background: 'var(--bg-white)' }}
                >
                  <ProductCard
                    variant="popular"
                    rank={index + 1}
                    likeCount={product.likeCount}
                    product={{
                      id: product.id,
                      name: product.name,
                      imageUrl:
                        !product.imageUrls?.[0] || product.imageUrls[0] === '없음'
                          ? '/assets/product/no-image.png'
                          : product.imageUrls[0],
                      price: product.free ? '무료나눔' : `${product.price.toLocaleString()}원`,
                      tags: product.tags ?? [],
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* 오프라인 매장 위치 */}
      <section className="my-6 -mx-4">
        <div className="rounded-md py-4 px-4" style={{ background: 'var(--bg-white)' }}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-semibold">오프라인 매장 위치</h2>
            <Link href="https://map.kakao.com/" target="_blank">
              <Image
                src="/assets/common/left-arrow.svg"
                alt="더보기"
                width={16}
                height={16}
                className="rotate-180 mr-1"
              />
            </Link>
          </div>
          <KakaoMap />
        </div>
      </section>

      {showScrollTop && (
        <button
          className="fixed bottom-24 right-6 w-10 h-10 rounded-full shadow-md text-xl"
          style={{ background: 'var(--bg-light-gray)' }}
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}
    </div>
  );
}
