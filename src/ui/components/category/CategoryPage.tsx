'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import ProductCard from '@/ui/components/common/ProductCard';
import { fetchCategoryProducts, ProductResponse } from '@/services/api/productApi';
import { usePathname, useSearchParams } from "next/navigation";
import { getCategoryInfoFromUrl } from "@/data/getCategoryInfo";

const CategoryPage: React.FC = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const info = getCategoryInfoFromUrl(pathname, searchParams);
  const searchParamString = searchParams.toString();

  useEffect(() => {
    setPage(0);
    setProducts([]);
  }, [info?.selectedGender, searchParamString]);

  const loadProducts = async (page: number) => {
    if (!info) return;
    setLoading(true);
    try {
      const newProducts = await fetchCategoryProducts(
        page,
        info.categoryCode + info.selectedSubCategoryCode,
        info.selectedGender ?? ''
      );
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
  }, [page, info?.selectedGender]);

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
                variant="category"
                rank={index + 1}
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
            </div>
          );
        })}
      </div>
      {loading && <p className="text-center mt-4">로딩 중...</p>}
      {!hasMore && (
        <p
          className="text-center mt-4"
          style={{ color: "var(--text-gray)" }}>
          모든 상품을 불러왔습니다.
        </p>
      )}
    </div>
  );
};

export default CategoryPage;