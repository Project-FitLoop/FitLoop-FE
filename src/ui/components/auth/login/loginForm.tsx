"use client";

import React, { useCallback } from "react";
import { Form, Input, Button, Checkbox, Divider, Typography, message } from "antd";
import Image from "next/image";
import { loginUser, getGoogleLoginUrl } from "@/services/api/auth";

const { Title, Text, Link } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const onFinish = useCallback(async (values: LoginFormValues) => {
    try {
      const accessToken = await loginUser(values.username, values.password);
      window.localStorage.setItem("access", accessToken);
      message.success("로그인 성공!");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("로그인 오류:", error);
      message.error(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
    }
  }, []);

  const onFinishFailed = useCallback(() => {
    message.error("로그인 정보를 다시 확인해주세요.");
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    try {
      const googleLoginUrl = await getGoogleLoginUrl();
      if (googleLoginUrl) window.location.href = googleLoginUrl;
      else message.error("Google 로그인 URL을 가져올 수 없습니다.");
    } catch {
      message.error("Google 로그인 요청 실패!");
    }
  }, []);

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        <Title level={4}>Sign in to your account</Title>
        <Text>
          Not a member? <Link href="/register">Start a 14 dat free trial</Link>
        </Text>
      </div>

      <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter your username!" }]}>
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Checkbox>Remember me</Checkbox>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block style={{ backgroundColor: "#000", borderColor: "#000" }}>
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <Divider>Or sign in with</Divider>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          size="large"
          block
          onClick={handleGoogleLogin}
          style={{
            backgroundColor: "white",
            color: "black",
            borderColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Image src="/assets/google.svg" alt="Google" width={20} height={20} />
          Google
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
