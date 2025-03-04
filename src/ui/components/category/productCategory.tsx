"use client";
import { useSearchParams } from "next/navigation";

export default function ProductCategoryPage({ categoryCode }: { categoryCode: string }) {
  const searchParams = useSearchParams();
  const gf = searchParams.get("gf") || "A";

  return (
    <div>
      <h1>상품 카테고리</h1>
      <p>카테고리 코드: {categoryCode}</p>
      <p>성별 필터: {gf}</p>
    </div>
  );
}
