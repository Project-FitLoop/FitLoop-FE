"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "antd";
import styles from "@/ui/components/tapbar/tab-bar.module.css"; // CSS 파일 불러오기

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

  const menuItems = tabs.map((tab) => ({
    key: tab.path,
    label: (
      <Link href={tab.path} className={`${styles.tabItem} ${tab.special ? styles.specialTab : ""}`}>
        <div className={`${styles.iconWrapper} ${tab.special ? styles.specialIconWrapper : ""}`}>
          <img src={tab.icon} alt={tab.name} width="24" height="24" className="mb-1" />
        </div>
        <span className={`${styles.tabText} ${tab.special ? styles.specialText : ""}`}>{tab.name}</span>
      </Link>
    ),
  }));

  return (
    <div className={styles.tabBar}>
      <Menu
        mode="horizontal"
        selectedKeys={[pathname]}
        className={styles.menu}
        items={menuItems}
      />
    </div>
  );
};

export default TabBar;
