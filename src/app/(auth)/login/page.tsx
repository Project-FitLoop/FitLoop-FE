import LoginForm from '@/ui/components/auth/login/loginForm';

export default function LoginPage() {
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
      <div style={{ width: "100%", maxWidth: "393px" }}>
        <LoginForm />
      </div>
    </div>
  );
}
