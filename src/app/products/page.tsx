import React from "react";
import ProductCard from "@/ui/components/common/ProductCard";

const products = [
  { id: 1, name: "Y2K 가죽 자켓", imageUrl: "/images/jacket.png", tags: ["Y2K", "패션"], price: "59,000원" },
  { id: 2, name: "스트릿 후드티", imageUrl: "/images/hoodie.png", tags: ["스트릿", "패션"], price: "45,000원" },
  { id: 3, name: "청바지", imageUrl: "/images/jeans.png", tags: ["데님", "캐주얼"], price: "39,000원" },
  { id: 4, name: "빈티지 백", imageUrl: "/images/bag.png", tags: ["빈티지", "패션"], price: "120,000원" },
  { id: 5, name: "워커 부츠", imageUrl: "/images/boots.png", tags: ["신발", "Y2K"], price: "85,000원" }, // ✅ 수정
  { id: 6, name: "체크 셔츠", imageUrl: "/images/shirt.png", tags: ["캐주얼", "남성"], price: "32,000원" },
  { id: 7, name: "롱 코트", imageUrl: "/images/coat.png", tags: ["포멀", "겨울"], price: "150,000원" },
  { id: 8, name: "스니커즈", imageUrl: "/images/sneakers.png", tags: ["신발", "캐주얼"], price: "95,000원" },
  { id: 9, name: "가죽 벨트", imageUrl: "/images/belt.png", tags: ["액세서리", "가죽"], price: "27,000원" },
];

const ProductList: React.FC = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 bg-gray-100">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
