"use client";

import React, { useEffect } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { message } from "antd";
import { likeProduct, unlikeProduct } from "@/services/api/likeApi";
import { useRouter } from "next/navigation";
import { useLikeStore } from "@/stores/likeStore";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  tags?: string[];
  price: string;
  likedByMe?: boolean;
  likeCount?: number;
}

type ProductCardVariant = "popular" | "recent" | "category" | 'search';

interface ProductCardProps {
  product: Product;
  variant: ProductCardVariant;
  rank?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant, rank }) => {
  const router = useRouter();

  const liked = useLikeStore((state) => state.isLiked(product.id));
  const likeCount = useLikeStore((state) => state.getLikeCount(product.id));
  const setLiked = useLikeStore((state) => state.setLiked);
  const setLikeCount = useLikeStore((state) => state.setLikeCount);

  useEffect(() => {
    if (product.likedByMe !== undefined) {
      setLiked(product.id, product.likedByMe);
    }
    if (product.likeCount !== undefined) {
      setLikeCount(product.id, product.likeCount);
    }
  }, [product.id, product.likedByMe, product.likeCount, setLiked, setLikeCount]);

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (liked) {
        await unlikeProduct(product.id);
        setLiked(product.id, false);
        setLikeCount(product.id, Math.max(likeCount - 1, 0));
      } else {
        await likeProduct(product.id);
        setLiked(product.id, true);
        setLikeCount(product.id, likeCount + 1);
      }
    } catch {
      message.warning("로그인이 필요합니다.");
      router.push("/login");
    }
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="block w-full max-w-[180px] bg-[var(--background)] shadow-sm overflow-hidden text-left relative pb-1.5 transition-all duration-300 ease-in-out"
    >
      <div className="w-full aspect-[3/4] bg-[var(--background)] flex items-center justify-center relative">
        <Image
          src={
            !product.imageUrl || product.imageUrl === "없음"
              ? "/assets/product/no-image.png"
              : product.imageUrl
          }
          alt={product.name}
          width={200}
          height={200}
          priority
          className="w-full h-full object-cover rounded-md"
        />

        {variant === "popular" && rank !== undefined && (
          <div
            className="absolute top-0 left-0 text-[10px] font-semibold px-[6px] py-[2px] rounded-tl-md rounded-br-md z-10"
            style={{ color: "var(--text-white)", backgroundColor: "var(--bg-dark-gray)" }}
          >
            {rank}
          </div>
        )}

        {(variant === "popular" || variant === "category") && (
          <div
            className="absolute top-0 right-0 text-[10px] font-semibold px-[6px] py-[2px] rounded-tr-md rounded-bl-md z-10 flex items-center gap-[2px]"
            style={{ color: "var(--text-white)", backgroundColor: "var(--bg-dark-gray)" }}
          >
            <HeartFilled className="text-[10px]" />
            {likeCount.toLocaleString()}명
          </div>
        )}

        <button
          onClick={handleToggleLike}
          className="absolute bottom-[6px] right-[10px] text-[18px] bg-none border-none cursor-pointer"
        >
          {liked ? (
            <HeartFilled style={{ color: "var(--icon-red)" }} />
          ) : (
            <HeartOutlined style={{ color: "var(--icon-white)", stroke: "var(--icon-white)" }} />
          )}
        </button>
      </div>

      <div className="px-1.5 pt-1.5 flex flex-col gap-1">
        <div className="text-[12px] font-bold leading-tight line-clamp-1 break-keep">
          {product.name}
        </div>
        <div className="text-[12px] font-bold text-[var(--text-black)]">
          {product.price}
        </div>
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
    </Link>
  );
};

export default ProductCard;
