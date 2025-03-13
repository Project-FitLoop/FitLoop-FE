"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories, subCategories } from "@/data/categories";
import Image from "next/image";

const CategoryPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<"all" | "men" | "women">("all");

  // URL에서 `gf` 값 가져와 성별 유지
  useEffect(() => {
    const gf = searchParams.get("gf") || "A";
    if (gf === "M") setSelectedTab("men");
    else if (gf === "F") setSelectedTab("women");
    else setSelectedTab("all");
  }, [searchParams]);

  // 현재 선택된 성별을 `gf` 값으로 변환
  const getGenderFilter = () => (selectedTab === "men" ? "M" : selectedTab === "women" ? "F" : "A");

  // 성별 탭 클릭 시 URL 업데이트
  const handleTabChange = (tab: "all" | "men" | "women") => {
    setSelectedTab(tab);
    router.push(`/product/category?gf=${tab === "men" ? "M" : tab === "women" ? "F" : "A"}`, { scroll: false });
  };

  // 카테고리 클릭 시 해당 위치로 스크롤 이동
  const scrollToCategory = (id: string) => {
    const container = scrollContainerRef.current;
    const targetElement = sectionRefs.current[id];

    if (container && targetElement) {
      const offsetTop = targetElement.offsetTop - 60 - 200;
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
      <div className="flex justify-start space-x-4 px-4 py-2 border-b sticky top-0 z-10" style={{ backgroundColor: "var(--bg-gray)" }}>
        {["전체", "남성", "여성"].map((tab, index) => (
          <button
            key={index}
            className="text-base font-bold px-4 py-2 transition"
            style={{
              color: selectedTab === (tab === "전체" ? "all" : tab === "남성" ? "men" : "women") ? "var(--text-black)" : "var(--text-gray)",
            }}
            onClick={() => handleTabChange(tab === "전체" ? "all" : tab === "남성" ? "men" : "women")}
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
                <h2 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>{category.name}</h2>
                <button className="text-sm font-medium" style={{ color: "var(--text-gray)" }} onClick={() => router.push(`/product/category/${category.code}?gf=${getGenderFilter()}`)}>
                  전체보기
                </button>
              </div>

              {/*중카테고리 리스트 */}
              <div className="grid grid-cols-3 gap-4 mt-3 mb-10">
                {subCategories[category.id]?.map((item) => {
                  const imagePath = `/assets/category/${category.code}${item.code}.svg`;

                  return (
                    <div key={item.code} className="flex flex-col items-center cursor-pointer" onClick={() => router.push(`/product/category/${category.code}${item.code}?gf=${getGenderFilter()}`)}>
                      <div className="w-16 h-16 rounded overflow-hidden flex justify-center items-center">
                        {/*이미지가 없을 경우 기본 이미지로 대체 */}
                        <Image
                          src={imagePath}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-contain"
                          onError={(e) => e.currentTarget.src = "/assets/category/default.svg"}
                        />
                      </div>
                      <p className="text-xs mt-2 text-center" style={{
                        color: "var(--text-black)",
                        wordBreak: "keep-all",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        textAlign: "center",
                        maxWidth: "100px",
                      }}>
                        {item.name}
                      </p>
                    </div>
                  );
                })}
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
