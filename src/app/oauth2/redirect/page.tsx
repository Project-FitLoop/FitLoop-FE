"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { message } from "antd";

const OAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    message.success("OAuth2 로그인 성공!");
    router.push("/dashboard");
  }, [router]);

  return <div>OAuth2 로그인 처리 중...</div>;
};

export default OAuthRedirect;
