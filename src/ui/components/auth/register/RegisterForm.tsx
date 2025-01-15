"use client";

import React from "react";
import { Form, Input, Button, Typography } from "antd";

const { Title, Text, Link } = Typography;

const RegisterForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("회원가입 성공:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("회원가입 실패:", errorInfo);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Title level={4}>Create your account</Title>
        <Text>
          Already a member? <Link href="/login">Sign in</Link>
        </Text>
      </div>
      <Form
        name="register"
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

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
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
