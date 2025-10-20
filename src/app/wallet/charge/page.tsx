import ChargePage from "@/ui/components/wallet/ChargePage";

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
        <ChargePage />
      </div>
    </div>
  );
}
