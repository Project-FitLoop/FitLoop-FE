'use client';

import { useEffect, useRef, useState } from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/ui/components/common/ProductCard';
import {
  fetchRecentProducts,
  fetchPopularProducts,
  ProductResponse,
} from '@/services/api/productApi';
import KakaoMap from '@/ui/components/map/KakaoMap';
import { useLikeStore } from '@/stores/likeStore';
import { useRouter } from 'next/navigation';

import { bannerConfigs, BannerConfig } from '@/data/banners';
import WelcomeCouponModal from '@/ui/components/coupon/WelcomeCouponModal';

export default function MainPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [recentProducts, setRecentProducts] = useState<ProductResponse[]>([]);
  const [popularProducts, setPopularProducts] = useState<ProductResponse[]>([]);
  const setLiked = useLikeStore((state) => state.setLiked);
  const setLikeCount = useLikeStore((state) => state.setLikeCount);
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [openWelcomeModal, setOpenWelcomeModal] = useState(false);

  const handleBannerClick = (banner: BannerConfig) => {
    if (
      banner.type === 'COUPON_DETAIL' &&
      (banner.id === 'welcome-coupon-pack' || banner.target === '/coupon/welcome')
    ) {
      setOpenWelcomeModal(true);
      return;
    }

    if (banner.type === 'EXTERNAL') {
      window.open(banner.target, '_blank');
      return;
    }

    router.push(banner.target);
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadProductsAndSyncLikes = async () => {
      try {
        const [recent, popular] = await Promise.all([
          fetchRecentProducts(0, 4),
          fetchPopularProducts(0, 10),
        ]);
        setRecentProducts(recent);
        setPopularProducts(popular);

        [...recent, ...popular].forEach((p) => {
          setLikeCount(p.id, p.likeCount);
          if (p.likedByMe !== undefined) {
            setLiked(p.id, p.likedByMe);
          }
        });
      } catch (err) {
        console.error('상품 불러오기 실패:', err);
      }
    };

    loadProductsAndSyncLikes();
  }, [setLiked, setLikeCount]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;
    let targetScrollLeft = 0;
    let animationFrame: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      slider.scrollLeft = lerp(slider.scrollLeft, targetScrollLeft, 0.2);
      if (Math.abs(slider.scrollLeft - targetScrollLeft) > 0.5) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      isDragging = false;
      startX = e.pageX;
      scrollLeft = slider.scrollLeft;
      cancelAnimationFrame(animationFrame);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const x = e.pageX;
      const walk = x - startX;
      if (Math.abs(walk) > 5) {
        isDragging = true;
        targetScrollLeft = scrollLeft - walk;
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const onMouseUp = () => {
      isDown = false;

      if (isDragging) {
        const preventClick = (e: MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          slider.removeEventListener('click', preventClick, true);
        };
        slider.addEventListener('click', preventClick, true);
      }
    };

    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mousemove', onMouseMove);
    slider.addEventListener('mouseup', onMouseUp);
    slider.addEventListener('mouseleave', onMouseUp);

    slider.querySelectorAll('*').forEach((el) => {
      (el as HTMLElement).style.userSelect = 'none';
      (el as HTMLElement).setAttribute('draggable', 'false');
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mousemove', onMouseMove);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mouseleave', onMouseUp);
    };
  }, [popularProducts]);

  const scrollToTop = () => {
    document
      .getElementById('scrollable-container')
      ?.scrollTo({ top: 0, behavior: 'smooth' });
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
      {/* 배너 캐러셀 */}
      <div
        className="mt-4 max-h-[250px] overflow-hidden rounded-md"
        style={{ background: 'var(--bg-white)' }}
      >
        <Carousel autoplay dots>
          {bannerConfigs.map((banner) => (
            <div key={banner.id}>
              <div
                className="relative w-full h-[200px] cursor-pointer"
                onClick={() => handleBannerClick(banner)}
              >
                <Image
                  src={banner.imageUrl}
                  alt={banner.title ?? '광고 배너'}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                {banner.badge && (
                  <div
                    className="absolute left-4 top-4 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      color: '#fff',
                    }}
                  >
                    {banner.badge}
                  </div>
                )}

                {(banner.title || banner.subtitle) && (
                  <div
                    className="absolute left-4 bottom-4 right-4 rounded-md px-3 py-2"
                    style={{
                      background: 'rgba(0, 0, 0, 0.45)',
                      color: '#fff',
                    }}
                  >
                    {banner.title && (
                      <p className="text-sm font-semibold line-clamp-1">
                        {banner.title}
                      </p>
                    )}
                    {banner.subtitle && (
                      <p className="mt-0.5 text-xs text-gray-100 line-clamp-1">
                        {banner.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* 최근 등록된 상품 */}
      <section className="my-6 -mx-4">
        <div
          className="rounded-md py-4 px-4"
          style={{ background: 'var(--bg-white)' }}
        >
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
              <ProductCard
                key={product.id}
                variant="recent"
                product={{
                  id: product.id,
                  name: product.name,
                  imageUrl:
                    product.imageUrls?.[0] ?? '/assets/product/no-image.png',
                  price: product.free
                    ? '무료나눔'
                    : `${product.price.toLocaleString()}원`,
                  tags: product.tags ?? [],
                  likedByMe: product.likedByMe,
                  likeCount: product.likeCount,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 인기 상품 */}
      <section className="my-6 -mx-4">
        <div
          className="rounded-md py-4 px-4"
          style={{ background: 'var(--bg-white)' }}
        >
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
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-scroll px-2 scrollbar-hide cursor-grab select-none"
            style={{ scrollBehavior: 'auto' }}
          >
            {popularProducts.map((product, index) => (
              <div
                key={product.id}
                className="min-w-[160px] max-w-[160px] flex-shrink-0 shadow-sm"
                style={{ background: 'var(--bg-white)' }}
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <ProductCard
                  variant="popular"
                  rank={index + 1}
                  product={{
                    id: product.id,
                    name: product.name,
                    imageUrl:
                      product.imageUrls?.[0] ??
                      '/assets/product/no-image.png',
                    price: product.free
                      ? '무료나눔'
                      : `${product.price.toLocaleString()}원`,
                    tags: product.tags ?? [],
                    likedByMe: product.likedByMe,
                    likeCount: product.likeCount,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 오프라인 매장 위치 */}
      <section className="my-6 -mx-4">
        <div
          className="rounded-md py-4 px-4"
          style={{ background: 'var(--bg-white)' }}
        >
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

      <WelcomeCouponModal
        open={openWelcomeModal}
        onClose={() => setOpenWelcomeModal(false)}
      />
    </div>
  );
}
