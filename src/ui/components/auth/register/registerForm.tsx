"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Progress, message } from "antd";
import type { Rule } from "antd/es/form";
import { registerUser, sendEmailCode, verifyEmailCode } from "@/services/api/auth";

const { Title, Text } = Typography;

const steps = [
  { title: "아이디를\n입력해 주세요.", field: "username", placeholder: "아이디" },
  { title: "비밀번호를\n입력해 주세요.", field: "password", placeholder: "비밀번호" },
  { title: "이메일을\n입력해 주세요.", field: "email", placeholder: "이메일" },
  { title: "이름을\n입력해 주세요.", field: "name", placeholder: "이름" },
  { title: "생년월일을\n입력해 주세요.", field: "birthday", placeholder: "YYYY-MM-DD" },
];

interface RegisterFormValues {
  username?: string;
  password?: string;
  email?: string;
  name?: string;
  birthday?: string;
}

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm<RegisterFormValues>();
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState<RegisterFormValues>({});

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [timer, setTimer] = useState(300);
  const [loading, setLoading] = useState(false);

  const currentField = steps[currentStep].field;
  const isEmailStep = currentField === "email";
  const isEmailLocked = isEmailStep && isEmailVerified;

  /* 타이머 */
  useEffect(() => {
    if (!isCodeSent || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCodeSent, timer]);

  const handleNext = async (values: Partial<RegisterFormValues>) => {
    const updatedValues = { ...formValues, ...values };
    setFormValues(updatedValues);
    if (currentField === "email" && !isEmailVerified) {
      message.error('이메일 인증을 완료해 주세요.');
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      form.setFieldsValue(updatedValues);
      return;
    }
    try {
      await registerUser(
        updatedValues.username!,
        updatedValues.password!,
        updatedValues.email!,
        updatedValues.name!,
        updatedValues.birthday!
      );
      message.success('회원가입이 완료되었습니다.');
    } catch (e: any) {
      message.error(`회원가입 중 오류가 발생했습니다.`);
    }
  };

  const handleSendEmailCode = async () => {
    try {
      await form.validateFields(["email"]);
      setLoading(true);

      const email = form.getFieldValue("email");
      await sendEmailCode(email);

      setIsCodeSent(true);
      setTimer(300);
      message.info(`인증번호가 발송되었습니다.`);
    } catch (e: any) {
      if (e?.errorFields) return; // validation 에러
      message.error(e.message || "인증번호 발송 실패");
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // 필드별 유효성 검사 규칙
  const validationRules: Record<string, unknown> = {
    username: [
      { required: true, message: "아이디를 입력해 주세요." },
      { pattern: /^[a-zA-Z0-9_-]{3,16}$/, message: "아이디는 3~16자 이내의 영문, 숫자, -, _만 가능합니다." },
    ],
    password: [
      { required: true, message: "비밀번호를 입력해 주세요." },
      { min: 8, message: "비밀번호는 최소 8자 이상이어야 합니다." },
      { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, message: "영문자와 숫자를 포함해야 합니다." },
    ],
    email: [
      { required: true, message: "이메일을 입력해 주세요." },
      { type: "email" as const, message: "유효한 이메일 주소를 입력해 주세요." },
    ],
    name: [
      { required: true, message: "이름을 입력해 주세요." },
      { pattern: /^[가-힣a-zA-Z\s]{2,30}$/, message: "이름은 2~30자의 한글, 영문만 가능합니다." },
    ],
    birthday: [
      { required: true, message: "생년월일을 입력해 주세요." },
      { pattern: /^\d{4}-\d{2}-\d{2}$/, message: "생년월일은 YYYY-MM-DD 형식이어야 합니다." },
    ],
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
        style={{ width: "100%", padding: "0 16px" }}

      >
        {/* 이메일 입력 + 인증 버튼 */}
        {currentField === "email" && !isCodeSent ? (
          <Form.Item
            name="email"
            rules={validationRules.email as Rule[]}
            style={{ marginBottom: 40 }}
          >
            <div
              style={{ display: "flex", gap: 12, alignItems: "center" }}
            >
              <Input
                disabled={isCodeSent}
                placeholder={steps[currentStep].placeholder}
                style={{
                  flex: 7,
                  border: "none",
                  borderBottom: "1px solid var(--border-light-gray)",
                  borderRadius: 0,
                  padding: "8px 0",
                  fontSize: 16,
                }}
              />

              <Button
                disabled={isCodeSent}
                loading={loading}
                style={{
                  flex: 3,
                  borderBottom: "1px solid var(--border-light-gray)",
                  borderRadius: 10,
                  padding: "16px 0",
                  fontSize: 14,
                  margin: 10,
                }}
                onClick={handleSendEmailCode}
              >
                인증번호 발송
              </Button>
            </div>
          </Form.Item>
        ) : (
          /* 기존 일반 입력 필드 */
          <Form.Item
            name={steps[currentStep].field}
            rules={
              validationRules[
              steps[currentStep].field as keyof RegisterFormValues
              ] as Rule[]
            }
            style={{ marginBottom: 40 }}
          >
            <Input
              disabled={isEmailLocked}
              placeholder={steps[currentStep].placeholder}
              type={
                steps[currentStep].field === "password" ? "password" : "text"
              }
              style={{
                border: "none",
                borderBottom: "1px solid var(--border-light-gray)",
                borderRadius: 0,
                padding: "8px 0",
                fontSize: 16,
              }}
            />
          </Form.Item>
        )}

        {/* 인증번호 입력 단계 */}
        {currentField === "email" && isCodeSent && !isEmailVerified && (
          <>
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <Input
                placeholder={"인증번호"}
                value={authCode}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                onChange={(e) => {
                  const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
                  setAuthCode(onlyNumber);
                }}
                suffix={
                  <span style={{ color: "#d9534f" }}>
                    {Math.floor(timer / 60)}:
                    {(timer % 60).toString().padStart(2, "0")}
                  </span>
                }
                style={{
                  flex: 7,
                  border: "none",
                  borderBottom: "1px solid var(--border-light-gray)",
                  borderRadius: 0,
                  padding: "8px 0",
                  fontSize: 16,
                }}
              />
              <Button
                loading={loading}
                style={{
                  flex: 3,
                  borderBottom: "1px solid var(--border-light-gray)",
                  borderRadius: 10,
                  padding: "16px 0",
                  fontSize: 14,
                }}
                onClick={handleSendEmailCode}
              >
                재전송
              </Button>
              <Button
                loading={loading}
                style={{
                  flex: 3,
                  borderBottom: "1px solid var(--border-light-gray)",
                  borderRadius: 10,
                  padding: "16px 0",
                  fontSize: 14,
                }}
                onClick={async () => {
                  try {
                    setLoading(true);
                    const email = form.getFieldValue("email");
                    await verifyEmailCode(email, authCode);
                    setIsEmailVerified(true);
                    message.success("이메일 인증 완료");
                  } catch (e: any) {
                    message.error("인증번호가 올바르지 않습니다.");
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                인증 확인
              </Button>
            </div>
          </>
        )}
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
          htmlType="submit"
          style={{
            width: currentStep > 0 ? "calc(50% - 8px)" : "100%",
            height: 48,
            backgroundColor: "var(--text-black)",
            border: "none",
            color: "var(--text-white)",
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