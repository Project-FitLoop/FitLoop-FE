"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const tabs = [
  { name: "메인", path: "/", icon: "/assets/main.svg" },
  { name: "룩앤폼", path: "/look", icon: "/assets/look.svg" },
  { name: "마이샵", path: "/myshop", icon: "/assets/myshop.svg", special: true },
  { name: "커뮤니티", path: "/community", icon: "/assets/community.svg" },
  { name: "마이페이지", path: "/mypage", icon: "/assets/mypage.svg" },
];

const hiddenPages = ["/admin", "/register", "/personinfo"];

const TabBar: React.FC = () => {
  const pathname = usePathname();
  if (hiddenPages.includes(pathname)) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center items-center px-0 py-2 z-50 bg-[var(--bg-white)] h-[50px]">
      <div className="flex justify-center items-center w-full max-w-[500px] p-0">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            href={tab.path}
            className={`flex flex-col items-center text-center w-full text-[var(--text-gray)] no-underline 
              ${tab.special ? "relative -top-[10px]" : ""}`}
          >
            <div
              className={`flex justify-center items-center mt-[5px] ${
                tab.special
                  ? "w-[50px] h-[50px] bg-[var(--bg-white)] rounded-full shadow-md"
                  : "w-[30px] h-[30px]"
              }`}
            >
              <Image
                src={tab.icon}
                alt={tab.name}
                width={24}
                height={24}
                priority
                className="opacity-70 transition-opacity duration-300 hover:opacity-100 w-[24px] h-[24px]"
              />
            </div>
            <span className="text-[12px] text-[var(--text-dark-gray)] font-normal mt-0 leading-[2] transition-all duration-300 hover:text-[var(--text-black)] hover:font-semibold">
              {tab.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
