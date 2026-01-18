"use client";

import React from "react";
import { Typography } from "antd";
import { HeartOutlined, MessageOutlined } from "@ant-design/icons";
import useHorizontalDragScroll from "@/services/hooks/useHorizontalDragScroll";

const { Text } = Typography;

export default function StyleMagazineSection({
  items,
}: {
  items: {
    id: number;
    title: string;
    likes: number;
    comments: number;
    thumbnail?: string | null;
  }[];
}) {
  const { ref, bind } = useHorizontalDragScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      {...bind}
      className="overflow-x-auto scrollbar-hide"
      style={{
        cursor: "grab",
        userSelect: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="flex gap-3 pb-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative flex-shrink-0 rounded-2xl bg-gray-100"
            style={{ width: 180, height: 200 }}
          >
            <div
              className="absolute inset-0 rounded-2xl bg-gray-200"
              style={{
                backgroundImage: item.thumbnail
                  ? `url(${item.thumbnail})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="absolute top-2 left-2 flex gap-2 text-white text-xs">
              <span className="flex items-center gap-1 bg-black/40 px-2 py-[2px] rounded-full">
                <HeartOutlined />
                {item.likes}
              </span>
              <span className="flex items-center gap-1 bg-black/40 px-2 py-[2px] rounded-full">
                <MessageOutlined />
                {item.comments}
              </span>
            </div>

            <div className="absolute bottom-2 left-2 right-2">
              <Text
                strong
                style={{
                  color: "white",
                  fontSize: 13,
                  whiteSpace: "pre-line",
                }}
              >
                {item.title}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
