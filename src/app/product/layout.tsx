"use client";

import { usePathname } from "next/navigation";
import Header from "@/ui/components/header/Header";
import CategoryHeader from "@/ui/components/header/CategoryHeader"; // 새로 추가
import FilterTabs from "@/ui/components/header/FilterTabs";
import CategoryFilterTabs from "@/ui/components/header/CategoryFilterTab";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isCategoryPage = pathname.startsWith("/product/category/");

  return (
    <div className="flex justify-center bg-[color:var(--bg-white)] min-h-screen">
      <div className="w-full max-w-[400px] flex flex-col h-screen bg-white">
        {/* 상단 헤더: 경로에 따라 분기 */}
        {isCategoryPage ? <CategoryHeader /> : <Header />}

        {/* 필터 탭: 경로에 따라 분기 */}
        {isCategoryPage ? <CategoryFilterTabs /> : <FilterTabs />}

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto scrollbar-hide">{children}</main>
      </div>
    </div>
  );
}
