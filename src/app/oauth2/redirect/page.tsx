"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { reissueAccessToken } from "@/services/api/auth";

const OAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // 중복 실행 방지: 세션 스토리지에 `reissueProcessed` 플래그 설정
    if (sessionStorage.getItem("reissueProcessed")) return;
    sessionStorage.setItem("reissueProcessed", "true");

    const fetchAccessToken = async () => {
      try {
        console.log("🔵 OAuth2 리다이렉트 완료, Access Token 요청 중...");

        // Access Token 요청
        const accessToken = await reissueAccessToken();

        // Access Token을 로컬 스토리지에 저장
        window.localStorage.setItem("access", accessToken);
        message.success("OAuth2 로그인 성공!");

        // 로그인 성공 후 대시보드 페이지로 이동
        router.push("/dashboard");
      } catch (error: unknown) {
        console.error("Access Token 요청 실패:", error);
        message.error("OAuth2 로그인 실패!");
        // 로그인 페이지로 리다이렉트
        router.push("/login");
      }
    };

    fetchAccessToken();
  }, [router]);

  return <div>OAuth2 로그인 처리 중...</div>;
};

export default OAuthRedirect;
