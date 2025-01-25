"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, Progress } from "antd";

const { Title, Text } = Typography;

const steps = [
  { title: "아이디를\n입력해 주세요.", field: "username", placeholder: "아이디" },
  { title: "비밀번호를\n입력해 주세요.", field: "password", placeholder: "비밀번호" },
  { title: "이메일을\n입력해 주세요.", field: "email", placeholder: "이메일" },
  { title: "이름을\n입력해 주세요.", field: "name", placeholder: "이름" },
];

interface RegisterFormValues {
  username?: string;
  password?: string;
  email?: string;
  name?: string;
}

const RegisterForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState<RegisterFormValues>({});

  const handleNext = (values: Partial<RegisterFormValues>) => {
    setFormValues({ ...formValues, ...values });
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("회원가입 완료:", formValues);
      alert("회원가입이 완료되었습니다!");
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
        <Progress
          percent={(currentStep + 1) * (100 / steps.length)}
          showInfo={false}
          strokeColor="#999"
          trailColor="#eee"
          style={{
            width: "100%",
            height: 8,
            marginBottom: 24,
          }}
        />

        {/* 단계 번호와 제목 */}
        <div style={{ marginTop: 16 }}>
          <Text
            style={{
              fontSize: 14,
              color: "#999",
              display: "block",
              marginBottom: 8,
            }}
          >
            {`${currentStep + 1}/${steps.length}`}
          </Text>
          <Title
            level={5}
            style={{
              margin: 0,
              fontWeight: 600,
              fontSize: 20,
              lineHeight: "1.5",
              color: "#333",
              whiteSpace: "pre-wrap",
            }}
          >
            {steps[currentStep].title}
          </Title>
        </div>
      </div>

      {/* 입력 필드 */}
      <Form
        onFinish={(values) => handleNext(values)}
        style={{
          width: "100%",
          padding: "0 16px",
        }}
        initialValues={formValues}
      >
        <Form.Item
          name={steps[currentStep].field}
          rules={[{ required: true, message: steps[currentStep].title }]}
          style={{ marginBottom: 40 }}
        >
          <Input
            placeholder={steps[currentStep].placeholder}
            style={{
              border: "none",
              borderBottom: "1px solid #ddd",
              borderRadius: 0,
              padding: "8px 0",
              fontSize: 16,
            }}
          />
        </Form.Item>
      </Form>

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
            style={{
              width: "calc(50% - 8px)",
              height: 48,
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              fontSize: 16,
              fontWeight: 600,
            }}
            onClick={handlePrevious}
          >
            이전
          </Button>
        )}
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: currentStep > 0 ? "calc(50% - 8px)" : "100%",
            height: 48,
            backgroundColor: "#333",
            border: "none",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
          }}
          onClick={() =>
            document.querySelector("form")?.dispatchEvent(new Event("submit", { bubbles: true }))
          }
        >
          {currentStep === steps.length - 1 ? "완료" : "다음"}
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
