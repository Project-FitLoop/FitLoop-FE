"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusOutlined, UpOutlined } from "@ant-design/icons";

const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScrollElement(document.documentElement || document.body);
    }
  }, []);

const scrollToTop = () => {
    const myPageContainer = document.getElementById("myPageContainer");

    if (myPageContainer) {
      myPageContainer.scrollTop = 0;
      myPageContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navigateToRegister = () => {
    router.push("/products/register");
  };

  return (
    <div style={styles.container}>
      {/* 화살표 버튼*/}
      <button
        style={{ ...styles.upButton, bottom: isExpanded ? 110 : 65 }}
        onClick={scrollToTop}
      >
        <UpOutlined style={{ fontSize: "20px", color: "#333" }} />
      </button>

      {/* 버튼 그룹 */}
      <div style={styles.buttonGroup}>
        {isExpanded && (
          <button style={styles.registerButton} onClick={navigateToRegister}>
            상품 등록
          </button>
        )}

        {/* + 버튼 */}
        <button style={styles.plusButton} onClick={() => setIsExpanded(!isExpanded)}>
          <PlusOutlined style={{ fontSize: "24px", color: "#fff" }} />
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
    gap: 5,
  },
  upButton: {
    position: "absolute",
    right: 0,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "50%",
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
  plusButton: {
    background: "#333",
    border: "none",
    borderRadius: "50%",
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
  registerButton: {
    position: "absolute",
    bottom: 55,
    right: 0,
    background: "#333",
    color: "#fff",
    borderRadius: "30px",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
};

export default FloatingActionButton;
