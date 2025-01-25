"use client";

import React, { useState } from "react";
import { Typography, Progress, Button } from "antd";

const { Title } = Typography;

const steps = [
  { title: "아이디를\n입력해 주세요.", field: "username", placeholder: "아이디" },
  { title: "비밀번호를\n입력해 주세요.", field: "password", placeholder: "비밀번호" },
  { title: "이메일을\n입력해 주세요.", field: "email", placeholder: "이메일" },
  { title: "이름을\n입력해 주세요.", field: "name", placeholder: "이름" },
];

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

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
        <Progress percent={(currentStep + 1) * (100 / steps.length)} showInfo={false} />
        <Title level={5}>{steps[currentStep].title}</Title>
      </div>

      {/* 하단 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: currentStep > 0 ? "space-between" : "center",
          padding: "0 16px",
        }}
      >
        {currentStep > 0 && (
          <Button
            style={{ width: "calc(50% - 8px)", height: 48 }}
            onClick={handlePrevious}
          >
            이전
          </Button>
        )}
        <Button
          type="primary"
          style={{ width: currentStep > 0 ? "calc(50% - 8px)" : "100%", height: 48 }}
          onClick={handleNext}
        >
          {currentStep === steps.length - 1 ? "완료" : "다음"}
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
