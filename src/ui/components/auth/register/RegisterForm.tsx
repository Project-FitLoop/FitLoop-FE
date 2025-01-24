"use client";

import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { registerUser } from "@/services/auth/auth"; // API 호출 파일 import

const { Title } = Typography;

interface RegisterFormValues {
  username: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const onFinish = async (values: RegisterFormValues) => {
    try {
      console.log("Form values:", values);
      // 회원가입 API 호출
      await registerUser(values.username, values.password);
      message.success("회원가입 성공! 이제 로그인할 수 있습니다.");

      // 회원가입 성공 후 로그인 페이지로 리다이렉트
      window.location.href = "/login";
    } catch (error: unknown) {
      // 에러 타입 확인 및 처리
      if (error instanceof Error) {
        message.error(error.message || "회원가입 실패! 사용자 이름이 중복되었을 수 있습니다.");
      } else {
        message.error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const onFinishFailed = () => {
    message.error("회원가입 양식을 확인해주세요.");
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Title level={4}>Create your account</Title>
      </div>
      <Form name="register" onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "ID를 입력해주세요" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "패스워드를 입력해주세요" },
            // 비밀번호 최소 길이 규칙 추가
            { min: 6, message: "비밀번호는 최소 6글자 이상이어야 합니다" },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
