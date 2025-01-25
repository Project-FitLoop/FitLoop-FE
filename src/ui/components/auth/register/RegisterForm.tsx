"use client";

import React from "react";
import { Typography, Progress, Button } from "antd";

const { Title } = Typography;

const RegisterForm = () => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#fff",
      }}
    >
      {/* 상단 진행 상황 */}
      <div style={{ padding: "20px 16px" }}>
        <Progress percent={25} showInfo={false} />
        <Title level={5}>아이디를 입력해 주세요.</Title>
      </div>

      {/* 하단 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0 16px",
        }}
      >
        <Button type="primary" style={{ width: "100%", height: 48 }}>
          다음
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
