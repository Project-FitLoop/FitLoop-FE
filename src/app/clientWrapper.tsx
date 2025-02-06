"use client";

import { useEffect, useState } from "react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 초기 마운트 상태일 때는 아무것도 렌더링하지 않음
  if (!mounted) return null;

  return <>{children}</>;
}
