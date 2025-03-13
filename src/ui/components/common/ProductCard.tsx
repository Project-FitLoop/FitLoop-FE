"use client";
import React, { useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import styles from "./ProductCard.module.css";
import Image from "next/image";


interface Product {
  id: number;
  name: string;
  imageUrl: string;
  tags: string[];
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
    <div className={styles.productCard}>
      {/* 상품 이미지 */}
      <div className={styles.productImage}>
        <Image 
          src={product.imageUrl} 
          alt={product.name} 
          width={200} // 적절한 크기로 변경 (원본 해상도 고려)
          height={200} 
          className={styles.image} 
          priority // 중요 이미지 최적화
        />
        <button className={styles.favoriteBtn} onClick={toggleFavorite}>
          {isFavorite ? (
            <HeartFilled className={styles.heartIconFilled} />
          ) : (
            <HeartOutlined className={styles.heartIconOutlined} />
          )}
        </button>
      </div>

      {/* 상품 정보 */}
      <div className={styles.productInfo}>
        <div className={styles.productName}>{product.name}</div>

        {/* 태그 */}
        <div className={styles.productTags}>
          {product.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>#{tag}</span>
          ))}
        </div>

        {/* 가격 */}
        <div className={styles.productPrice}>{product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
