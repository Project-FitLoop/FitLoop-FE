"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const FilterTabs = () => {
  const currentPath = usePathname();

  return (
    <div
      className="flex justify-start space-x-6 px-4 py-2 border-b"
      style={{ backgroundColor: "var(--bg-white)", borderColor: "var(--bg-gray)" }}
    >
      <Link href="/product/popularity">
        <button
          className="text-sm px-4 py-2 rounded-full transition"
          style={{
            backgroundColor: currentPath === "/product/popularity" ? "var(--bg-dark-gray)" : "transparent",
            color: currentPath === "/product/popularity" ? "var(--text-white)" : "var(--text-black)",
          }}
        >
          인기
        </button>
      </Link>
      <Link href="/product/recent">
        <button
          className="text-sm px-4 py-2 rounded-full transition"
          style={{
            backgroundColor: currentPath === "/product/recent" ? "var(--bg-dark-gray)" : "transparent",
            color: currentPath === "/product/recent" ? "var(--text-white)" : "var(--text-black)",
          }}
        >
          최근 등록된 상품
        </button>
      </Link>
      <Link href="/product/category">
        <button
          className="text-sm px-4 py-2 rounded-full transition"
          style={{
            backgroundColor: currentPath === "/product/category" ? "var(--bg-dark-gray)" : "transparent",
            color: currentPath === "/product/category" ? "var(--text-white)" : "var(--text-black)",
          }}
        >
          카테고리별
        </button>
      </Link>
    </div>
  );
};

export default FilterTabs;
