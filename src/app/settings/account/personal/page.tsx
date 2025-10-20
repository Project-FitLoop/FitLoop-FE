"use client";

import PersonalInfo from "@/ui/components/setting/PersonalInfo";
import FloatingActionButton from "@/ui/components/common/FloatingActionButton";

export default function Page() {
  return (
    <div
      id="scrollable-container"
      className="scrollbar-hide"
      style={{
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        scrollBehavior: "smooth",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <PersonalInfo />
      </div>
      <FloatingActionButton />
    </div>
  );
}
