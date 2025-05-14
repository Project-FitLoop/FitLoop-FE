'use client';

import React, { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Form, Input, Button, Checkbox, Divider, Typography, message } from 'antd';
import Image from 'next/image';
import { loginUser, getGoogleLoginUrl } from '@/services/api/auth';

const { Title, Text } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get('redirect') || '/mypage';

  const onFinish = useCallback(
    async (values: LoginFormValues) => {
      try {
        const { personalInfo } = await loginUser(values.username, values.password);
        message.success('로그인에 성공했습니다.');
        window.location.href = personalInfo ? redirectPath : '/personinfo';
      } catch (error) {
        console.error('로그인 오류:', error);
        message.error(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
      }
    },
    [redirectPath]
  );

  const onFinishFailed = useCallback(() => {
    message.error('아이디와 비밀번호를 확인해주세요.');
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    try {
      const googleLoginUrl = await getGoogleLoginUrl();
      if (googleLoginUrl) window.location.href = googleLoginUrl;
      else message.error('Google 로그인 URL을 가져올 수 없습니다.');
    } catch {
      message.error('Google 로그인 요청 실패!');
    }
  }, []);

  return (
    <div className="flex justify-center bg-gray-50 h-auto min-h-screen px-4">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="flex justify-center mb-2">
          <Image
            src="/assets/loginform/login_logo.svg"
            alt="Login Logo"
            width={120}
            height={40}
            priority
          />
        </div>

        {/* 헤더 */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">FITLOOP</h1>
          <p className="text-sm text-gray-500 mt-1">자연을 입다, 감성을 나누다</p>
        </div>

        {/* 로그인 카드 */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 space-y-6">
          <div className="text-center">
            <Title level={3} className="!text-xl !mb-2 font-bold text-gray-800">로그인</Title>
            <Text className="text-sm text-gray-600">
              아직 회원이 아니신가요?{' '}
              <a href="/register" className="text-blue-600 font-semibold hover:underline">
                회원가입
              </a>
            </Text>
          </div>

          {/* 로그인 폼 */}
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              label="아이디"
              name="username"
              rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
            >
              <Input
                placeholder="아이디를 입력해주세요"
                size="large"
                className="rounded-lg h-11 bg-white border border-gray-300 px-4 placeholder-gray-400"
              />
            </Form.Item>

            <Form.Item
              label="비밀번호"
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
            >
              <Input.Password
                placeholder="비밀번호를 입력해주세요"
                size="large"
                className="rounded-lg h-11 bg-white border border-gray-300 px-4 placeholder-gray-400"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" className="!mb-1">
              <div className="flex justify-between items-center text-gray-600">
                <Checkbox className="text-gray-700">자동 로그인</Checkbox>
                <a href="/forgot-password" className="text-sm text-gray-500 hover:underline">
                  비밀번호 찾기
                </a>
              </div>
            </Form.Item>

            <Form.Item className="!mt-4 !mb-2">
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="bg-black hover:bg-gray-800 border-none text-white rounded-lg h-12 font-medium transition"
              >
                로그인
              </Button>
            </Form.Item>
          </Form>

          <Divider className="border-gray-300" />

          {/* Google 로그인 */}
          <Button
            size="large"
            block
            onClick={handleGoogleLogin}
            className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg h-12 flex items-center justify-center gap-2 text-gray-700 font-medium"
          >
            <Image src="/assets/google.svg" alt="Google" width={20} height={20} />
            Google로 로그인
          </Button>
        </div>
      </div>
    </div>
  );
}
