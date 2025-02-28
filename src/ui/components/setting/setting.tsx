"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { logoutUser } from "@/services/api/auth"; //
import styles from "./settings.module.css";

const Settings: React.FC = () => {
  const router = useRouter();

  /** 로그아웃 실행 함수 */
  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/login");
    } catch (error) {
      alert(error instanceof Error ? error.message : "로그아웃 중 오류 발생");
    }
  };

  return (
    <div className={styles.settingsContainer}>
      {/* 상단 헤더 */}
      <div className={styles.header}>
        <LeftOutlined className={styles.backIcon} onClick={() => router.push("/mypage")} />
        <h1 className={styles.headerTitle}>설정</h1>
      </div>

      {/* 설정 목록 */}
      <div className={styles.settingsList}>
        {["계정 정보 관리", "이용약관", "공지사항", "고객센터", "신고하기", "로그아웃"].map((item, index) => (
          <div 
            key={index} 
            className={styles.settingItem} 
            onClick={item === "로그아웃" ? handleLogout : () => alert(`${item} 클릭됨`)}
          >
            <span>{item}</span>
            <RightOutlined className={styles.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
