"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Typography, Layout, message } from "antd";
import axios from "axios";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  // Axios 인스턴스 설정
  const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true, // HttpOnly 쿠키 포함
  });

  // Access Token 갱신 로직
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await axios.post(`${apiClient.defaults.baseURL}/auth/refresh`, {}, { withCredentials: true });
          const newAccessToken = res.data.accessToken;

          // 새 Access Token 저장 및 요청 재시도
          apiClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          message.error("세션이 만료되었습니다. 다시 로그인해주세요.");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  // 사용자 정보 요청
  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await apiClient.get("/api/user-info", {
        headers: {
          access: `${localStorage.getItem("access")}`, // Access Token 추가
        },
      });
      setUsername(response.data);
    } catch (error: unknown) { // UNKNOWN 타입으로 변경
      if (error instanceof Error) {
        message.error(error.message || "사용자 정보를 불러올 수 없습니다.");
      } else {
        message.error("알 수 없는 오류가 발생했습니다.");
      }
      setUsername(null);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", color: "#fff", textAlign: "center" }}>
        <Title level={3} style={{ color: "#fff" }}>대시보드</Title>
      </Header>
      <Content style={{ padding: "20px", textAlign: "center" }}>
        {username ? (
          <Title level={4}>{username}님, 안녕하세요!</Title>
        ) : (
          <Title level={5}>사용자 정보를 불러오는 중...</Title>
        )}
      </Content>
      <Footer style={{ textAlign: "center" }}>© 2025 FitLoop</Footer>
    </Layout>
  );
};

export default Dashboard;
