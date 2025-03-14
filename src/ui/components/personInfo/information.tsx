"use client";

import React, { useState } from "react";
import { Form, Input, Button, Select, Progress, Typography } from "antd";
import type { Rule } from "antd/es/form";
import { registerInfomation } from "@/services/api/user";

const { Text, Title } = Typography;

const steps = [
  { title: "닉네임을\n입력해 주세요.", field: "nickname", placeholder: "예: user123" },
  { title: "성별을\n선택해 주세요.", field: "gender", type: "select", options: ["남자", "여자"] },
  { title: "연령대를\n선택해 주세요.", field: "ageRange", type: "select", options: ["10대", "20대", "30대", "40대", "50대", "60대", "70대", "80대"] },
  { title: "키를\n입력해 주세요.", field: "height", placeholder: "예: 170" },
  { title: "몸무게를\n입력해 주세요.", field: "weight", placeholder: "예: 65" }
];

interface InformationFormValues {
  nickname: string;
  gender: string;
  ageRange: string;
  height: string;
  weight: string;
}

const validationRules: Record<string, Rule[]> = {
  nickname: [
    { required: true, message: "닉네임을 입력해 주세요." },
    { pattern: /^[a-zA-Z0-9_-]{3,16}$/, message: "닉네임은 3~16자의 영문, 숫자, -, _만 가능합니다." }
  ],
  gender: [{ required: true, message: "성별을 선택해 주세요." }],
  ageRange: [{ required: true, message: "연령대를 선택해 주세요." }],
  height: [
    { required: true, message: "키를 입력해 주세요." },
    { pattern: /^\d+$/, message: "키는 숫자만 입력 가능합니다." }
  ],
  weight: [
    { required: true, message: "몸무게를 입력해 주세요." },
    { pattern: /^\d+$/, message: "몸무게는 숫자만 입력 가능합니다." }
  ]
};

const Information: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState<Partial<InformationFormValues>>({});
  const [form] = Form.useForm();

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      const updatedValues = { ...formValues, ...values };
      setFormValues(updatedValues);

      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        form.resetFields();
      } else {
        await registerInfomation(
          updatedValues.nickname!,
          updatedValues.gender!,
          updatedValues.ageRange!,
          updatedValues.height!,
          updatedValues.weight!
        );
        alert("프로필 작성이 완료되었습니다!");
      }
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      form.setFieldsValue(formValues);
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
        backgroundColor: "var(--bg-white)",
      }}
    >
      {/* 상단 진행 상황 */}
      <div style={{ padding: "20px 16px" }}>
        <Progress
          percent={(currentStep + 1) * (100 / steps.length)}
          showInfo={false}
          strokeColor="var(--border-gray)"
          trailColor="var(--border-light-gray)"
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
              color: "var(--text-gray)",
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
              color: "var(--text-black)",
              whiteSpace: "pre-wrap",
            }}
          >
            {steps[currentStep].title}
          </Title>
        </div>
      </div>

      {/* 입력 필드 */}
      <Form
        form={form}
        onFinish={handleNext}
        style={{
          width: "100%",
          padding: "0 16px",
        }}
        initialValues={formValues}
      >
        <Form.Item
          name={steps[currentStep].field}
          rules={validationRules[steps[currentStep].field as keyof InformationFormValues]}
          style={{ marginBottom: 40 }}
        >
          {steps[currentStep].type === "select" ? (
            <Select
              placeholder={steps[currentStep].title}
              options={steps[currentStep].options?.map((option) => ({
                value: option,
                label: option,
              }))}
              size="large"
            />
          ) : (
            <Input
              placeholder={steps[currentStep].placeholder}
              size="large"
              style={{
                border: "none",
                borderBottom: "1px solid var(--border-light-gray)",
                borderRadius: 0,
                padding: "8px 0",
                fontSize: 16,
              }}
            />
          )}
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
              backgroundColor: "var(--bg-gray)",
              border: "1px solid var(--border-gray)",
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
          onClick={() => form.submit()}
          style={{
            width: currentStep > 0 ? "calc(50% - 8px)" : "100%",
            height: 48,
            backgroundColor: "var(--text-black)",
            border: "none",
            color: "var(--text-white)",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {currentStep === steps.length - 1 ? "완료" : "다음"}
        </Button>
      </div>
    </div>
  );
};

export default Information;
