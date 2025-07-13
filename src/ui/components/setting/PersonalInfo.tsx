/* eslint-disable */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";

declare global {
  interface Window {
    daum: any;
  }
}

const PersonalInfo: React.FC = () => {
  const router = useRouter();

  // 주소검색 상태
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isDaumLoaded, setIsDaumLoaded] = useState(false);

  // 연락처 상태
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");

  // 생년월일
  const [birthdate, setBirthdate] = useState("2000-01-31");

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

  /* 전화번호 자동 하이픈  */
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
              placeholder="fitloop@gmail.com"
              onClick={() => alert("구현 예정")}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white focus:outline-none"
            />
            <button
              onClick={() => alert("구현 예정")}
              className="border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white"
            >
              인증하기
            </button>
          </div>
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
            <span className="text-[14px] text-black">내 계좌번호</span>
            <RightOutlined className="text-[16px] text-gray-400" />
          </Link>
        </div>

        {/* 생년월일 */}
        <div className="flex flex-col space-y-2">
          <label className="text-[14px] text-black">생년월일 <span className="text-red-500">*</span> </label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white focus:outline-none"
          />
        </div>

        {/* 배송지 */}
        <div className="flex flex-col space-y-2">
          <label className="text-[14px] text-black">배송지 <span className="text-red-500">*</span> </label>

          {/* 주소 input + 버튼 가로 배치 */}
          <div className="flex gap-2">
            <input
              readOnly
              value={address}
              placeholder="주소를 선택하세요"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white focus:outline-none"
            />
            <button
              onClick={handlePostcodeSearch}
              disabled={!isDaumLoaded}
              className={`border rounded-md px-3 py-2 text-[14px] ${
                isDaumLoaded
                  ? "text-black border-gray-300 bg-white"
                  : "text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed"
              }`}
            >
              {isDaumLoaded ? "주소 검색" : "로딩 중..."}
            </button>
          </div>

          <input
            readOnly
            value={postalCode}
            placeholder="우편번호"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white focus:outline-none"
          />
          <input
            type="text"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            placeholder="상세 주소 입력"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px] text-black bg-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
