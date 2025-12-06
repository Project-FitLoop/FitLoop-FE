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
  const navigateToCouponRegister = () => {
    router.push("/coupons/register");
  };

  return (
    <div style={styles.container}>
      <button
        style={{ ...styles.upButton, bottom: isExpanded ? 110 : 65 }}
        onClick={scrollToTop}
      >
        <UpOutlined style={{ fontSize: "20px", color: "#333" }} />
      </button>

      <div style={styles.buttonGroup}>
        {isExpanded && (
          <>
            {isMyShopPage ? (
              <>
                <button
                  style={{ ...styles.registerButton, bottom: 105 }}
                  onClick={navigateToChallengeRegister}
                >
                  챌린지 등록
                </button>

                <button
                  style={{ ...styles.registerButton, bottom: 205 }}
                  onClick={navigateToCouponRegister}
                >
                  쿠폰 등록
                </button>

                <button
                  style={{ ...styles.registerButton, bottom: 55 }}
                  onClick={navigateToProductRegister}
                >
                  상품 등록
                </button>
                <button
                  style={{ ...styles.registerButton, bottom: 155 }}
                  onClick={navigateToLookRegister}
                >
                  룩 등록
                </button>
              </>
            ) : (
              <button
                style={{ ...styles.registerButton, bottom: 55 }}
                onClick={navigateToProductRegister}
              >
                상품 등록
              </button>
              
            )}
          </>
        )}
        <button
          style={styles.plusButton}
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
