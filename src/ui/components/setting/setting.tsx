"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { logoutUser } from "@/services/api/auth";

const Settings: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/login");
    } catch (error) {
      alert(error instanceof Error ? error.message : "로그아웃 중 오류 발생");
    }
  };

  const settingItems = [
    "계정 정보 관리",
    "이용약관",
    "공지사항",
    "고객센터",
    "신고하기",
    "로그아웃",
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-white)] p-4 font-['Apple_SD_Gothic_Neo','Noto_Sans_KR',sans-serif]">
      {/* 상단 헤더 */}
      <div className="flex items-center pb-4">
        <LeftOutlined
          className="text-[20px] text-[var(--text-black)] cursor-pointer"
          onClick={() => router.push("/mypage")}
        />
        <h1 className="flex-1 text-center text-[18px] font-bold text-[var(--text-black)]">
          설정
        </h1>
      </div>

      {/* 설정 항목 목록 */}
      <div className="flex flex-col">
        {settingItems.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center py-4 text-[16px] text-[var(--text-black)] border-b border-[var(--border-light-gray)] cursor-pointer ${
              index === settingItems.length - 1 ? "border-b-0" : ""
            }`}
            onClick={() => {
              if (item === "로그아웃") {
                handleLogout();
              } else if (item === "계정 정보 관리") {
                router.push("/settings/account");
              } else {
                alert(`${item} 클릭됨`);
              }
            }}
          >
            <span className="font-medium">{item}</span>
            <RightOutlined className="text-[16px] text-[var(--icon-gray)]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
