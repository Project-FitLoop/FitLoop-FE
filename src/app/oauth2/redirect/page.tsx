"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { reissueAccessToken } from "@/services/api/auth";

const OAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // 이미 처리되었다면 실행하지 않음
    if (sessionStorage.getItem("reissueProcessed")) return;

    const fetchAccessToken = async () => {
      try {
        // Access Token 요청
        const accessToken = await reissueAccessToken();

        // Access Token을 로컬 스토리지에 저장
        window.localStorage.setItem("access", accessToken);
        message.success("OAuth2 로그인 성공!");

        // 로그인 성공 시에만 플래그 설정
        sessionStorage.setItem("reissueProcessed", "true");

        // 로그인 성공 후 대시보드 페이지로 이동
        router.push("/dashboard");
      } catch (error: unknown) {
        console.error("Access Token 요청 실패:", error);
        message.error("OAuth2 로그인 실패!");

        // 로그인 실패 시 플래그 제거
        sessionStorage.removeItem("reissueProcessed");

        // 로그인 페이지로 리다이렉트
        router.push("/login");
      }
    };

    fetchAccessToken();
  }, [router]);

  return <div>OAuth2 로그인 처리 중...</div>;
};

export default OAuthRedirect;
