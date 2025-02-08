"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "@/ui/components/tapbar/tab-bar.module.css";

const tabs = [
  { name: "메인", path: "/", icon: "/assets/main.png" },
  { name: "룩앤폼", path: "/look", icon: "/assets/look.png" },
  { name: "마이샵", path: "/myshop", icon: "/assets/myshop.png", special: true },
  { name: "커뮤니티", path: "/community", icon: "/assets/community.png" },
  { name: "마이페이지", path: "/mypage", icon: "/assets/mypage.png" },
];

const hiddenPages = ["/admin"];

const TabBar: React.FC = () => {
  const pathname = usePathname();
  if (hiddenPages.includes(pathname)) return null;

  return (
    <div className={styles.tabBar}>
      <div className={styles.menu}>
        {tabs.map((tab) => (
          <Link key={tab.path} href={tab.path} className={`${styles.tabItem} ${tab.special ? styles.specialTab : ""}`}>
            <div className={`${styles.iconWrapper} ${tab.special ? styles.specialIconWrapper : ""}`}>
              <Image src={tab.icon} alt={tab.name} width={24} height={24} priority />
            </div>
            <span className={`${styles.tabText} ${tab.special ? styles.specialText : ""}`}>{tab.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
