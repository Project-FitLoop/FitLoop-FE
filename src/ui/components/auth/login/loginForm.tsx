'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, Input, Button, Checkbox, Divider, Typography, message } from 'antd';
import Image from 'next/image';
import { loginUser, getGoogleLoginUrl } from '@/services/api/auth';

const { Title, Text } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onFinish = useCallback(
    async (values: LoginFormValues) => {
      try {
        const { personalInfo, fullName, role } = await loginUser(values.username, values.password);

        await message.success({
          content: role === 'ADMIN' ? `반갑습니다, 관리자 ${fullName}님` : `안녕하세요, ${fullName}님`,
          duration: 1,
        });

        const redirectParam = searchParams?.get('redirect');
        const defaultByRole = role === 'ADMIN' ? '/admin/dashboard' : '/mypage';
        const target = personalInfo ? (redirectParam ?? defaultByRole) : '/personinfo';

        router.replace(target);
      } catch (error) {
        console.error('로그인 오류:', error);
        message.error(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
      }
    },
    [router, searchParams]
  );

  const onFinishFailed = useCallback(() => {
    message.error('아이디와 비밀번호를 확인해주세요.');
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    try {
      const googleLoginUrl = await getGoogleLoginUrl();
      if (googleLoginUrl) {
        window.location.href = googleLoginUrl;
      } else {
        message.error('Google 로그인 URL을 가져올 수 없습니다.');
      }
    } catch {
      message.error('Google 로그인 요청 실패!');
    }
  }, []);

  return (
    <div className="flex justify-center items-start bg-white px-4 pt-28">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="flex justify-center mb-4">
          <Image src="/assets/loginform/login_logo.svg" alt="Fitloop Logo" width={100} height={40} priority />
        </div>

        {/* 로그인 카드 */}
        <div className="bg-white rounded-xl shadow-xl px-6 py-8">
          {/* 헤더 */}
          <div className="text-center mb-6">
            <Title level={3} className="!text-2xl !mb-2 font-bold text-gray-900">
              계정에 로그인
            </Title>
            <Text className="text-sm text-gray-500">
              아직 회원이 아니신가요?{' '}
              <Link href="/register" className="text-indigo-600 font-medium hover:underline">
                회원가입 하기
              </Link>
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
              label={<span className="text-sm text-gray-700 font-medium">이메일 주소</span>}
              name="username"
              rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
            >
              <Input
                size="large"
                className="rounded-md h-11 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="you@example.com"
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-sm text-gray-700 font-medium">비밀번호</span>}
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
            >
              <Input.Password
                size="large"
                className="rounded-md h-11 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item className="!mb-2">
              <div className="flex justify-between items-center">
                <Checkbox className="text-gray-600">로그인 상태 유지</Checkbox>
                <Link href="/forgot-password" className="text-sm text-indigo-600 hover:underline">
                  비밀번호 찾기
                </Link>
              </div>
            </Form.Item>

            <Form.Item className="!mb-4">
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="bg-indigo-600 hover:bg-indigo-700 border-none rounded-md h-11 font-semibold"
              >
                로그인
              </Button>
            </Form.Item>
          </Form>

          <Divider plain className="text-sm text-gray-500">또는 소셜 계정으로 로그인</Divider>

          <div className="flex gap-3">
            <Button
              block
              onClick={handleGoogleLogin}
              className="flex-1 bg-white border border-gray-300 rounded-md h-11 flex items-center justify-center gap-2 text-gray-700 font-medium hover:bg-gray-50"
            >
              <Image src="/assets/google.svg" alt="Google" width={20} height={20} /> Google 로그인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}