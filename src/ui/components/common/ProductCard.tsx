"use client";
import React, { useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from 'next/navigation';

// 상품 데이터 인터페이스
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  tags?: string[];
  price: string;
}

// 카드 유형 정의
type ProductCardVariant = "popular" | "recent" | "category";

// 카드 컴포넌트 Props
interface ProductCardProps {
  product: Product;
  variant: ProductCardVariant;
  rank?: number;
  likeCount?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant,
  rank,
  likeCount,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const goToDetailPage = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div
      onClick={goToDetailPage}
      className="w-full max-w-[180px] bg-[var(--background)] shadow-sm overflow-hidden text-left relative pb-1.5 transition-all duration-300 ease-in-out"
    >
      {/* 이미지 영역 */}
      <div className="w-full aspect-[3/4] bg-[var(--background)] flex items-center justify-center relative transition-all duration-300 ease-in-out">
        <Image
          src={
            !product.imageUrl || product.imageUrl === '없음'
              ? '/assets/product/no-image.png'
              : product.imageUrl
          }
          alt={product.name}
          width={200}
          height={200}
          priority
          className="w-full h-full object-cover rounded-md"
        />
        {/* 순위 (popular 전용) */}
        {variant === "popular" && rank !== undefined && (
          <div className="absolute top-0 left-0 text-[10px] font-semibold px-[6px] py-[2px] rounded-tl-md rounded-br-md z-10"
            style={{ color: "var(--text-white)", backgroundColor: "var(--bg-dark-gray)" }}>
            {rank}
          </div>
        )}
        {/* 좋아요 수 (popular, category) */}
        {(
          (variant === "popular" || variant === "category") &&
          likeCount !== undefined
        ) && (
          <div className="absolute top-0 right-0 text-[10px] font-semibold px-[6px] py-[2px] rounded-tr-md rounded-bl-md z-10 flex items-center gap-[2px]"
            style={{ color: "var(--text-white)", backgroundColor: "var(--bg-dark-gray)" }}>
            <HeartFilled className="text-[10px]" style={{ color: "var(--text-white)" }} />
            {likeCount.toLocaleString()}명
          </div>
        )}
        {/* 좋아요 토글 버튼 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
          className="absolute bottom-[6px] right-[10px] bg-none border-none cursor-pointer text-[18px]"
        >
          {isFavorite ? (
            <HeartFilled style={{ color: "var(--icon-red)" }} />
          ) : (
            <HeartOutlined style={{
              color: "var(--icon-white)", stroke: "var(--icon-white)",
            }} />
          )}
        </button>
      </div>
      {/* 상품 정보 영역 */}
      <div className="px-1.5 pt-1.5 flex flex-col gap-1">
        {/* 상품명 */}
        <div className="text-[12px] font-bold leading-tight line-clamp-1 break-keep">
          {product.name}
        </div>
        {/* 가격 */}
        <div className="text-[12px] font-bold text-[var(--text-black)]">
          {product.price}
        </div>
        {/* 태그 */}
        <div className="flex overflow-hidden gap-[2px] max-w-full">
          {(product.tags ?? []).slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="text-[9px] whitespace-nowrap text-ellipsis overflow-hidden bg-[var(--bg-white)] text-[var(--text-dark-gray)] rounded-full px-[3px] py-[1px] border border-[var(--border-light-gray)]"
              style={{ maxWidth: "60px" }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;