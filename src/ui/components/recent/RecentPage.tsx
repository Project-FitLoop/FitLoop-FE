'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import ProductCard from '@/ui/components/common/ProductCard';

interface ProductResponse {
  id: number;
  name: string;
  price: number;
  includeShipping: boolean;
  likeCount: number;
  createdAt: string;
  imageUrls: string[];
  tags?: string[];
  free: boolean;
}

interface RecentPageProps {
  categoryCode?: string;
}

const RecentPage: React.FC<RecentPageProps> = ({ categoryCode }) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<ProductResponse[]>(
        `http://localhost:8080/api/v1/products/recent?page=${page}&size=9`
      );
      console.log("요청됨");
      const newProducts = response.data;

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
    if (!loading) {
      fetchProducts(page);
    }
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
      <h2 className="text-xl font-semibold mb-4">최근 등록된 상품</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
        {products.map((product, index) => {
          const isLast = index === products.length - 1;

          return (
            <div key={product.id} ref={isLast ? lastProductRef : null}>
              <ProductCard
                product={{
                  id: product.id,
                  name: product.name,
                  imageUrl: product.imageUrls?.[0] ?? '/assets/default.png',
                  tags: product.tags ?? [],
                  price: product.free
                    ? '무료나눔'
                    : `${product.price.toLocaleString()}원`,
                }}
              />
            </div>
          );
        })}
      </div>
      {loading && <p className="text-center mt-4">로딩 중...</p>}
      {!hasMore && (
        <p className="text-center mt-4 text-gray-400">
          모든 상품을 불러왔습니다.
        </p>
      )}
    </div>
  );
};

export default RecentPage;
