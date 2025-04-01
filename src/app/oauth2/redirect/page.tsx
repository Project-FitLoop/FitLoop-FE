"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { reissueAccessToken } from "@/services/api/auth";

const OAuthRedirect = () => {
  const router = useRouter();
  const isProcessing = useRef(false);

  useEffect(() => {
    if (isProcessing.current) return;
    isProcessing.current = true;

    const fetchAccessToken = async () => {
      try {
        console.log("Access Token 요청 시작");
        const accessToken = await reissueAccessToken();

        document.cookie = `access=${accessToken}; path=/;`;
        message.success("OAuth2 로그인 성공!");

        router.push("/dashboard");
      } catch (error: unknown) {
        console.error("Access Token 요청 실패:", error);
        message.error("OAuth2 로그인 실패!");

        router.push("/login");
      }
    };

    fetchAccessToken();
  }, [router]);

  return <div>OAuth2 로그인 처리 중...</div>;
};

export default OAuthRedirect;
