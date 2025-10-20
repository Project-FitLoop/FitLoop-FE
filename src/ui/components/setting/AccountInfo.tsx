"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const AccountInfo: React.FC = () => {
  const router = useRouter();

  const items = [
    { label: "개인정보", href: "/settings/account/personal" },
    { label: "계정정보", href: "/settings/account/profile" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-white)] p-4 font-['Apple_SD_Gothic_Neo','Noto_Sans_KR',sans-serif]">
      {/* 상단 헤더 */}
      <div className="flex items-center pb-4">
        <LeftOutlined
          className="text-[20px] text-[var(--text-black)] cursor-pointer"
          onClick={() => router.push("/settings")}
        />
        <h1 className="flex-1 text-center text-[18px] font-bold text-[var(--text-black)]">
          계정 정보 관리
        </h1>
      </div>

      {/* 목록 */}
      <div className="flex flex-col">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-4 text-[16px] text-[var(--text-black)] border-b border-[var(--border-light-gray)] cursor-pointer"
            onClick={() => router.push(item.href)}
          >
            <span className="font-medium">{item.label}</span>
            <RightOutlined className="text-[16px] text-[var(--icon-gray)]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountInfo;
