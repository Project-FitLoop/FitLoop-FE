"use client";

import React from "react";
import useHorizontalDragScroll from "@/services/hooks/useHorizontalDragScroll";

export default function CategoryChips({
  categories,
  value,
  onChange,
}: {
  categories: { key: string; label: string }[];
  value: string;
  onChange: (key: string) => void;
}) {
  const { ref, bind } = useHorizontalDragScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      {...bind}
      className="mt-3 mb-1 overflow-x-auto scrollbar-hide"
      style={{
        cursor: "grab",
        userSelect: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="flex gap-2 pb-1">
        {categories.map((c) => {
          const active = c.key === value;
          return (
            <button
              key={c.key}
              onClick={() => onChange(c.key)}
              className="px-3 py-[6px] rounded-full text-xs border flex-shrink-0"
              style={{
                borderColor: active ? "#111" : "#e5e7eb",
                background: active ? "#111" : "#fff",
                color: active ? "#fff" : "#111",
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
