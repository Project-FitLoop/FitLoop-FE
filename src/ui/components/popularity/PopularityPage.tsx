'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import ProductCard from '@/ui/components/common/ProductCard';
import { fetchPopularProducts, ProductResponse } from '@/services/api/productApi';

const PopularityPage: React.FC = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadProducts = async (page: number) => {
    setLoading(true);
    try {
      const newProducts = await fetchPopularProducts(page);
      setProducts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const uniqueNew = newProducts.filter((p) => !ids.has(p.id));
        return [...prev, ...uniqueNew];
      });
      setHasMore(newProducts.length === 9);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) loadProducts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 justify-items-center">
        {products.map((product, index) => {
          const isLast = index === products.length - 1;
          return (
            <div key={product.id} ref={isLast ? lastProductRef : null}>
              <ProductCard
                variant="popular"
                rank={index + 1}
                likeCount={product.likeCount}
                product={{
                  id: product.id,
                  name: product.name,
                  imageUrl: product.imageUrls?.[0] ?? '/assets/default.png',
                  tags: product.tags ?? [],
                  price: product.free ? '무료나눔' : `${product.price.toLocaleString()}원`,
                }}
              />
            </div>
          );
        })}
      </div>
      {loading && <p className="text-center mt-4">로딩 중...</p>}
      {!hasMore && (
        <p className="text-center mt-4" style={{color: "var(--text-dark-gray)"}}>
          모든 상품을 불러왔습니다.
        </p>
      )}
    </div>
  );
};

export default PopularityPage;