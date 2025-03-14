"use client"
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PlusOutlined, UpOutlined, AppstoreAddOutlined } from "@ant-design/icons";

const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScrollElement(document.documentElement || document.body);
    }
  }, []);

  const scrollToTop = () => {
    if (scrollElement) {
      scrollElement.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div style={styles.container}>
      {/* 화살표 버튼*/}
      <button
        style={{ ...styles.upButton, bottom: isExpanded ? 110 : 65 }}
        onClick={scrollToTop}
      >
        <UpOutlined style={{ fontSize: "22px", color: "#333" }} />
      </button>

      {/* 버튼 그룹 */}
      <div style={styles.buttonGroup}>
        {isExpanded && (
          <Button
            type="primary"
            style={styles.registerButton}
            onClick={() => alert("상품 등록 페이지로 이동")}
          >
            상품 등록
          </Button>
        )}

        {/* + 버튼 */}
        <button style={styles.plusButton} onClick={() => setIsExpanded(!isExpanded)}>
          <PlusOutlined style={{ fontSize: "22px", color: "#fff" }} />
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    bottom: 65,
    right: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 1000,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
  },
  upButton: {
    position: "absolute",
    right: 0,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "50%",
    width: 42,
    height: 42,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    // transition: "bottom 0.3s ease-in-out",
  },
  plusButton: {
    background: "#333",
    border: "none",
    borderRadius: "50%",
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
  registerButton: {
    position: "absolute",
    bottom: 60,
    right: 0,
    background: "#333",
    color: "#fff",
    borderRadius: "20px",
    padding: "50x 18px",
    display: "flex",
    alignItems: "center",
    transition: "opacity 0.3s ease-in-out",
    fontSize: "16px",
    whiteSpace: "nowrap",
  },
};

export default FloatingActionButton;
