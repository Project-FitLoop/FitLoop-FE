"use client";

import React from "react";
import { Card, Form, Input, Button, Select } from "antd";
import type { Rule } from "antd/es/form";

// 개인정보 입력 폼 값 인터페이스 정의
interface InformationFormValues {
  nickname: string;
  gender: string;
  ageRange: string;
  height: string;
  weight: string;
}

// 유효성 검사 규칙 정의
const validationRules: Record<keyof InformationFormValues, Rule[]> = {
  nickname: [
    { required: true, message: "닉네임을 입력해 주세요." },
    {
      pattern: /^[a-zA-Z0-9_-]{3,16}$/,
      message: "닉네임은 3~16자 이내의 영문, 숫자, -, _만 가능합니다."
    }
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

// 성별 선택 옵션
const genderOptions = [
  { value: "남자", label: "남자" },
  { value: "여자", label: "여자" }
];

// 연령대 선택 옵션
const ageRangeOptions = [
  { value: "10대", label: "10대" },
  { value: "20대", label: "20대" },
  { value: "30대", label: "30대" },
  { value: "40대", label: "40대" },
  { value: "50대", label: "50대" },
  { value: "60대", label: "60대" },
  { value: "70대", label: "70대" },
  { value: "80대", label: "80대" }
];

const Information: React.FC = () => {
  // 폼 제출 시 호출되는 핸들러
  const onFinish = async (values: InformationFormValues): Promise<void> => {
    console.log(values);
    alert("회원가입이 완료되었습니다!");
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
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <Card title="개인정보 입력" bordered={false}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            nickname: "",
            gender: "",
            ageRange: "",
            height: "",
            weight: ""
          }}
        >
          <Form.Item
            label="닉네임"
            name="nickname"
            rules={validationRules.nickname}
          >
            <Input placeholder="예: user123" size="large" />
          </Form.Item>
          <Form.Item
            label="성별"
            name="gender"
            rules={validationRules.gender}
          >
            <Select
              placeholder="성별 선택"
              size="large"
              options={genderOptions}
            />
          </Form.Item>
          <Form.Item
            label="연령대"
            name="ageRange"
            rules={validationRules.ageRange}
          >
            <Select
              placeholder="연령대 선택"
              size="large"
              options={ageRangeOptions}
            />
          </Form.Item>
          <Form.Item
            label="키 (cm)"
            name="height"
            rules={validationRules.height}
          >
            <Input placeholder="예: 170" size="large" />
          </Form.Item>
          <Form.Item
            label="몸무게 (kg)"
            name="weight"
            rules={validationRules.weight}
          >
            <Input placeholder="예: 65" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              완료
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Information;
