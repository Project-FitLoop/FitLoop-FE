"use client";

import React from "react";
import { Typography, Layout } from "antd";
import { useUserInfo } from "@/services/hooks/useUser";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { data: username, isLoading } = useUserInfo();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", color: "#fff", textAlign: "center" }}>
        <Title level={3} style={{ color: "#fff" }}>대시보드</Title>
      </Header>
      <Content style={{ padding: "20px", textAlign: "center" }}>
        {isLoading ? (
          <Title level={5}>사용자 정보를 불러오는 중...</Title>
        ) : username ? (
          <Title level={4}>{`${username}님, 안녕하세요!`}</Title>
        ) : (
          <Title level={5}>사용자 정보를 가져올 수 없습니다.</Title>
        )}
      </Content>
      <Footer style={{ textAlign: "center" }}>© 2025 FitLoop</Footer>
    </Layout>
  );
};

export default Dashboard;
