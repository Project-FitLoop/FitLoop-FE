"use client";

import React from "react";
import { Form, Input, Button, Checkbox, Divider, Typography, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { loginUser } from "@/services/api/auth"; // API 호출 파일 import

const { Title, Text, Link } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const onFinish = async (values: LoginFormValues) => {
    try {
      // 로그인 API 호출
      const accessToken = await loginUser(values.username, values.password);

      // Access Token을 로컬 스토리지에 저장
      window.localStorage.setItem("access", accessToken);
      message.success("로그인 성공!");

      // 로그인 성공 후 리다이렉트
      window.location.href = "/dashboard";
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message || "로그인 실패! 사용자 이름 또는 비밀번호를 확인해주세요.");
      } else {
        message.error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.error("실패:", errorInfo);
    message.error("로그인 양식을 확인해주세요.");
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          style={{ marginBottom: "10px" }}
        />
        <Title level={4}>Sign in to your account</Title>
        <Text>
          Not a member? <Link href="/register">Start a 14 day free trial</Link>
        </Text>
      </div>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Checkbox>Remember me</Checkbox>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign in
          </Button>
        </Form.Item>
      </Form>

      <Divider>Or continue with</Divider>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Button icon={<GoogleOutlined />} size="large" block>
          Google
        </Button>
        <Button
          icon={
            <Image
              src="/kakao-icon.svg"
              alt="Kakao"
              width={20}
              height={20}
              style={{ display: "inline-block" }}
            />
          }
          size="large"
          block
          style={{ backgroundColor: "#FEE500", color: "#000" }}
        >
          Kakao
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
