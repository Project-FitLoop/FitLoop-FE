"use client";
import React, { useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import styles from "./ProductCard.module.css";

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
        <img src={product.imageUrl} alt={product.name} className={styles.image} />
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
