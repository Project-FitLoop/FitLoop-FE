"use client";

import React from "react";
import { Form, Input, Button, Checkbox, Divider, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Title, Text, Link } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginForm: React.FC = () => {
  const onFinish = (values: LoginFormValues) => {
    console.log("성공:", values);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("실패:", errorInfo);
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
          label="Email address"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter your email" />
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
