"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { categories, subCategories } from "@/data/categories";

const CategoryPage = () => {
  const router = useRouter();
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedTab, setSelectedTab] = useState<"all" | "men" | "women">("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 

  // 탭바 높이
  const TABBAR_HEIGHT = 60;

  // 카테고리 클릭 시 해당 위치로 스크롤 이동
  const scrollToCategory = (id: string) => {
    const container = scrollContainerRef.current;
    const targetElement = sectionRefs.current[id];

    if (container && targetElement) {
      const offsetTop = targetElement.offsetTop - TABBAR_HEIGHT - 200;
      container.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  // 현재 선택된 탭에 맞는 카테고리 필터링
  const filteredCategories = categories.filter(
    (category) => selectedTab === "all" || category.gender === "all" || category.gender === selectedTab
  );

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: "var(--bg-white)" }}>
      {/* 상단 필터 탭 */}
      <div
        className="flex justify-start space-x-4 px-4 py-2 border-b sticky top-0 z-10"
        style={{ backgroundColor: "var(--bg-gray)" }}
      >
        {["전체", "남성", "여성"].map((tab, index) => (
          <button
            key={index}
            className="text-base font-bold px-4 py-2 transition"
            style={{
              color: selectedTab === (tab === "전체" ? "all" : tab === "남성" ? "men" : "women")
                ? "var(--text-black)" // 선택된 글씨 진하게
                : "var(--text-gray)", // 기본 글씨 색상
            }}
            onClick={() => setSelectedTab(tab === "전체" ? "all" : tab === "남성" ? "men" : "women")}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex h-full">
        {/* 좌측 카테고리 사이드바 */}
        <aside className="w-1/4 border-r p-0" style={{ backgroundColor: "var(--bg-gray)" }}>
          <ul className="text-sm">
            {filteredCategories.map((category) => (
              <li
                key={category.id}
                className="cursor-pointer text-center py-3 transition-all"
                style={{
                  width: "100%",
                  backgroundColor: selectedCategory === category.id ? "var(--bg-white)" : "var(--bg-gray)",
                  color: selectedCategory === category.id ? "var(--text-black)" : "var(--text-dark-gray)",
                }}
                onClick={() => {
                  setSelectedCategory(category.id);
                  scrollToCategory(category.id);
                }}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* 스크롤 가능한 컨테이너 */}
        <div ref={scrollContainerRef} className="flex-1 p-6 overflow-auto scrollbar-hide">
          {filteredCategories.map((category) => (
            <div key={category.id} id={category.id} ref={(el) => { sectionRefs.current[category.id] = el; return undefined; }}>
              <div className="flex items-center justify-between border-b pb-2 mb-4">
                <h2 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>
                  {category.name}
                </h2>
                <button
                  className="text-sm font-medium"
                  style={{ color: "var(--text-gray)" }}
                  onClick={() => router.push(`/category/${category.code}?gf=A`)}
                >
                  전체보기
                </button>
              </div>

              {/*중카테고리 리스트 */}
              <div className="grid grid-cols-3 gap-4 mt-3 mb-10"> 
                {subCategories[category.id]?.map((item) => (
                  <div
                    key={item.code}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => router.push(`/category/${category.id}/${item.code}?gf=A`)}
                  >
                    <div className="w-16 h-16 rounded" style={{ backgroundColor: "var(--bg-dark-gray)" }}></div>
                    <p className="text-sm mt-2" style={{ color: "var(--text-dark-gray)" }}>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* 하단 여백 추가 */}
          <div className="h-[100px]"></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
