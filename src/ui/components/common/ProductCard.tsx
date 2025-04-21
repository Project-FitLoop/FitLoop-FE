"use client";
import React, { useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  tags?: string[];
  price: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="w-full max-w-[180px] bg-[var(--background)] shadow-sm overflow-hidden text-left relative pb-1.5 transition-all duration-300 ease-in-out">
      {/* 이미지 */}
      <div className="w-full aspect-[3/4] bg-[var(--background)] flex items-center justify-center relative transition-all duration-300 ease-in-out">
        <Image
          src={product.imageUrl || "/assets/default.png"}
          alt={product.name}
          width={200}
          height={200}
          priority
          className="w-full h-full object-cover"
        />
        <button
          onClick={toggleFavorite}
          className="absolute bottom-[6px] right-[10px] bg-none border-none cursor-pointer text-[18px]"
        >
          {isFavorite ? (
            <HeartFilled className="text-red-500 text-[18px]" />
          ) : (
            <HeartOutlined className="text-white stroke-white text-[18px]" />
          )}
        </button>
      </div>

      {/* 상품 정보 */}
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
