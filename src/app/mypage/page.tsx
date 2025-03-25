import MyPage from "@/ui/components/mypage/mypage";
import FloatingActionButton from "@/ui/components/common/FloatingActionButton";


export default function Page() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "auto" }}>
      <div style={{ width: "100%", maxWidth: "400px", height: "auto" }}>
        <MyPage />
      </div>
      <FloatingActionButton />
    </div>
  );
}
