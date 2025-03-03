"use client";

import { useRef, forwardRef, useState } from "react";

// 각 카테고리 이름과 서브 카테고리 배열
const categories = [
  { name: "신발", id: "shoes", gender: "all" },
  { name: "아우터", id: "outerwear", gender: "all" },
  { name: "상의", id: "tops", gender: "all" },
  { name: "바지", id: "pants", gender: "all" },
  { name: "원피스", id: "dresses", gender: "women" },
  { name: "스커트", id: "skirts", gender: "women" },
  { name: "가방", id: "bags", gender: "all" },
  { name: "패션소품", id: "fashionAccessories", gender: "all" },
];

const subCategories: { [key: string]: string[] } = {
  shoes: ["신상품", "힐", "플랫/로퍼", "부츠/워커", "스니커즈", "샌들", "슬리퍼/쪼리"],
  outerwear: ["신상품", "코트", "재킷", "패딩", "카디건", "블레이저"],
  tops: ["신상품", "티셔츠", "셔츠", "블라우스", "니트", "후드/맨투맨"],
  pants: ["신상품", "청바지", "슬랙스", "조거팬츠", "숏팬츠", "레깅스"],
  dresses: ["신상품", "미니 원피스", "미디 원피스", "롱 원피스", "오피스 원피스", "캐주얼 원피스"],
  skirts: ["신상품", "미니스커트", "미디스커트", "롱스커트", "플리츠스커트"],
  bags: ["신상품", "크로스백", "숄더백", "토트백", "미니백", "백팩", "클러치"],
  fashionAccessories: ["신상품", "모자", "벨트", "장갑", "스카프", "아이웨어", "헤어 액세서리"],
};

const CategorySection = forwardRef<HTMLDivElement, { id: string; name: string; subCategories: string[] }>(
  ({ id, name, subCategories }, ref) => (
    <section id={id} ref={ref} className="mb-12">
      <h2 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>{name}</h2>
      <div className="grid grid-cols-3 gap-4 mt-3">
        {subCategories.map((item, subIndex) => (
          <div key={subIndex} className="flex flex-col items-center">
            <div
              className="w-16 h-16 rounded"
              style={{ backgroundColor: "var(--bg-dark-gray)" }} // 네모 박스 색상 변경
            ></div>
            <p className="text-sm mt-2" style={{ color: "var(--text-dark-gray)" }}>{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
);

CategorySection.displayName = "CategorySection";

const CategoryPage = () => {
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedTab, setSelectedTab] = useState<"all" | "men" | "women">("all");

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
    <div className="flex h-full flex-col">
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
        <aside className="w-1/4 border-r p-4" style={{ backgroundColor: "var(--bg-gray)" }}>
          <ul className="space-y-2 text-sm">
            {filteredCategories.map((category) => (
              <li
                key={category.id}
                className="hover:text-black cursor-pointer"
                style={{ color: "var(--text-dark-gray)" }}
                onClick={() => scrollToCategory(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* 스크롤 가능한 컨테이너 */}
        <div ref={scrollContainerRef} className="flex-1 p-6 overflow-auto scrollbar-hide">
          {filteredCategories.map((category) => (
            <CategorySection
              key={category.id}
              id={category.id}
              name={category.name}
              subCategories={subCategories[category.id]}
              ref={(el) => {
                sectionRefs.current[category.id] = el;
                return undefined;
              }}
            />
          ))}
          {/* 하단 여백 추가 */}
          <div className="h-[100px]"></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
