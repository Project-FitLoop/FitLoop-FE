/* eslint-disable */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { fetchProfile } from "@/services/api/settingApi";

declare global {
  interface Window {
    daum: any;
  }
}

const PersonalInfo: React.FC = () => {
  const router = useRouter();

  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isDaumLoaded, setIsDaumLoaded] = useState(false);

  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");

  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();

        setPhone1(formatPhoneNumber(data.phoneNumber || ""));
        setEmail(data.email || "");
        setAccountNumber(data.accountNumber || "");
        setBirthdate(data.birthday || "");
        setAddress(data.address || "");
        setPostalCode(data.postalCode || "");
        setDetailAddress(data.detailAccountNumber || "");
      } catch (err) {
        console.error("개인정보 불러오기 실패", err);
        alert("개인정보를 불러오는 데 실패했습니다.");
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.daum?.postcode) {
      setIsDaumLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.defer = true;
    script.onload = () => setIsDaumLoaded(true);
    script.onerror = () => console.error("Daum postcode script load error");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePostcodeSearch = () => {
    if (!isDaumLoaded) {
      alert("카카오 우편번호 서비스가 아직 준비되지 않았습니다. 잠시만 기다려주세요.");
      return;
    }

    window.daum.postcode.load(() => {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          setPostalCode(data.zonecode);
          setAddress(data.address);
        },
      }).open();
    });
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");

    if (digits.startsWith("02")) {
      if (digits.length < 3) return digits;
      if (digits.length < 6) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
      if (digits.length < 10) return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
      return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
    } else {
      if (digits.length < 4) return digits;
      if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
    }
  };

  /** 연락처 핸들러 */
  const handlePhone1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone1(formatPhoneNumber(e.target.value));
  };

  const handlePhone2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone2(formatPhoneNumber(e.target.value));
  };

  return (
    <div className="min-h-screen bg-white p-4 font-['Apple_SD_Gothic_Neo','Noto_Sans_KR',sans-serif]">
      {/* 상단 헤더 */}
      <div className="flex items-center pb-4">
        <LeftOutlined
          className="text-xl text-black cursor-pointer"
          onClick={() => router.push("/settings/account")}
        />
        <h1 className="flex-1 text-center text-[18px] font-bold text-black">
          개인정보
        </h1>
      </div>

      <div className="flex flex-col space-y-5">
        {/* 연락처1 */}
        <div className="flex flex-col space-y-2">
          <label className="text-[14px] text-black">
            연락처 1 <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="tel"
            value={phone1}
            onChange={handlePhone1Change}
            placeholder="010-1234-5678"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white focus:outline-none"
          />
        </div>

        {/* 연락처2 */}
        <div className="flex flex-col space-y-2">
          <label className="text-[14px] text-black">연락처 2</label>
          <input
            type="tel"
            value={phone2}
            onChange={handlePhone2Change}
            placeholder="선택 입력"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white focus:outline-none"
          />
        </div>

        {/* 이메일 (기존 그대로 유지) */}
        <div className="flex flex-col space-y-2">
          <label className="text-[14px] text-black">이메일 <span className="text-red-500">*</span></label> 
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              readOnly={email !== ""}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white focus:outline-none"
            />
            <button
              disabled={email !== ""}
              onClick={() => setShowVerification(true)}
              className={`border rounded-md px-3 py-2 text-[14px] ${
                email !== ""
                  ? "text-gray-400 border-gray-200 bg-gray-100 cursor-not-allowed"
                  : "text-black border-gray-300 bg-white"
              }`}
            >
              인증하기
            </button>
          </div>

          {/* 인증번호 입력 창 */}
          {showVerification && email === "" && (
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="인증번호 입력"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white focus:outline-none"
              />
              <button
                onClick={() => alert("인증 확인 로직 구현 예정")}
                className="border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white"
              >
                확인
              </button>
            </div>
          )}
        </div>

        {/* 계좌번호 */}
        <div className="flex flex-col space-y-2">
          <label className="text-[14px] text-black">
            계좌번호 <span className="text-red-500">*</span>
          </label>
          <Link
            href="/settings/account/account-number"
            className="flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
          >
            <span className="text-[14px] text-black">{accountNumber || "내 계좌번호"}</span>
            <RightOutlined className="text-[16px] text-gray-400" />
          </Link>
        </div>

        {/* 생년월일 */}
        <div className="flex flex-col space-y-2">
          <label className="text-[14px] text-black">생년월일 <span className="text-red-500">*</span></label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white focus:outline-none"
          />
        </div>

        {/* 배송지 */}
        <div className="flex flex-col space-y-2">
          <label className="text-[14px] text-black">배송지 <span className="text-red-500">*</span></label>
          <div className="flex gap-2">
            <input
              readOnly
              value={postalCode}
              placeholder="우편번호 입력"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white focus:outline-none"
            />
            <button
              onClick={handlePostcodeSearch}
              disabled={!isDaumLoaded}
              className={`border rounded-md px-3 py-2 text-[14px] ${isDaumLoaded
                ? "text-black border-gray-300 bg-white"
                : "text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed"
              }`}
            >
              {isDaumLoaded ? "주소 검색" : "로딩 중..."}
            </button>
          </div>

          <input
            readOnly
            value={address}
            placeholder="주소 입력"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white focus:outline-none"
          />
          <input
            readOnly
            value={detailAddress}
            placeholder="상세 주소 입력"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;