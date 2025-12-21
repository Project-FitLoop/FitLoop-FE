"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PlusOutlined, UpOutlined } from "@ant-design/icons";

const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isMyShopPage = pathname?.startsWith("/myshop");

  const scrollToTop = () => {
    const scrollContainer = document.getElementById("scrollable-container");

    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navigateToProductRegister = () => {
    router.push("/products/register");
  };

  const navigateToLookRegister = () => {
    router.push("/looks/register");
  };

  const navigateToChallengeRegister = () => {
    router.push("/challenges/register");
  };

  const openCouponModal = () => {
    window.dispatchEvent(new CustomEvent("open-coupon-modal"));
  };

  return (
    <div style={styles.container}>
      <button
        style={{
          ...styles.upButton,
          bottom: isMyShopPage
            ? isExpanded
              ? 265
              : 65
            : isExpanded
              ? 110
              : 65,
        }}
        onClick={scrollToTop}
      >
        <UpOutlined style={{ fontSize: "20px", color: "#333" }} />
      </button>

      <div style={styles.buttonGroup}>
        {isMyShopPage ? (
          <>
            <button
              style={{
                ...styles.registerButton,
                bottom: 205,
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded ? "translateY(0)" : "translateY(8px)",
                pointerEvents: isExpanded ? "auto" : "none",
              }}
              onClick={openCouponModal}
            >
              쿠폰 등록
            </button>

            <button
              style={{
                ...styles.registerButton,
                bottom: 155,
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded ? "translateY(0)" : "translateY(8px)",
                pointerEvents: isExpanded ? "auto" : "none",
              }}
              onClick={navigateToLookRegister}
            >
              룩 등록
            </button>

            <button
              style={{
                ...styles.registerButton,
                bottom: 105,
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded ? "translateY(0)" : "translateY(8px)",
                pointerEvents: isExpanded ? "auto" : "none",
              }}
              onClick={navigateToChallengeRegister}
            >
              챌린지 등록
            </button>

            <button
              style={{
                ...styles.registerButton,
                bottom: 55,
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded ? "translateY(0)" : "translateY(8px)",
                pointerEvents: isExpanded ? "auto" : "none",
              }}
              onClick={navigateToProductRegister}
            >
              상품 등록
            </button>
          </>
        ) : (
          <button
            style={{
              ...styles.registerButton,
              bottom: 55,
              opacity: isExpanded ? 1 : 0,
              transform: isExpanded ? "translateY(0)" : "translateY(8px)",
              pointerEvents: isExpanded ? "auto" : "none",
            }}
            onClick={navigateToProductRegister}
          >
            상품 등록
          </button>
        )}

        <button
          style={{
            ...styles.plusButton,
            transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
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
    position: "relative",
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
    zIndex: 20,
    transition: "bottom 0.2s ease",
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
    transition: "transform 0.2s ease",
  },
  registerButton: {
    position: "absolute",
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
    zIndex: 10,
    transition: "opacity 0.2s ease, transform 0.2s ease, bottom 0.2s ease",
  },
};

export default FloatingActionButton;
