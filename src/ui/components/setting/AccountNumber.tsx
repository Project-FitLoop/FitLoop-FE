"use client";

import React, { useState, useEffect } from "react";
import { BANK_LIST } from "@/data/bankList";
import { useRouter } from "next/navigation";
import { LeftOutlined, DownOutlined } from "@ant-design/icons";

export default function AccountNumberForm() {
  const router = useRouter();

  const [selectedBank, setSelectedBank] = useState<{ code: string; name: string } | null>(null);
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [owner, setOwner] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [allAgreed, setAllAgreed] = useState(false);
  const [required1, setRequired1] = useState(false);
  const [required2, setRequired2] = useState(false);
  const [optional, setOptional] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [saved, setSaved] = useState(false);

  // 숫자만 입력
  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value.replace(/\D/g, ""));
  };

  // 저장 버튼 클릭
  const handleSaveClick = () => {
    if (!selectedBank || !accountNumber.trim() || !owner.trim()) {
      setErrorMessage("모든 항목을 입력해주세요.");
      return;
    }
    setErrorMessage("");
    setShowConsentModal(true);
    document.body.style.overflow = "hidden";
  };

  // 모두 동의
  const handleAgreeAll = () => {
    const newValue = !allAgreed;
    setAllAgreed(newValue);
    setRequired1(newValue);
    setRequired2(newValue);
    setOptional(newValue);
  };

  // 약관 동의 완료
  const handleConsentComplete = () => {
    if (!required1 || !required2) {
      alert("필수 항목을 모두 동의해주세요.");
      return;
    }
    setShowConsentModal(false);
    setShowCompleteModal(true);
    document.body.style.overflow = "auto";
  };

  // 등록 완료 확인
  const handleConfirmComplete = () => {
    setShowCompleteModal(false);
    setSaved(true);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen px-4 py-4 bg-[var(--bg-white)] text-[var(--text-black)] relative">
      {/* 상단 헤더 */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} aria-label="뒤로가기" className="p-1">
          <LeftOutlined className="text-xl text-[var(--icon-black)]" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold">
          계좌번호 설정
        </h1>
      </div>

      {!saved && (
        <div className="max-w-md mx-auto space-y-6 pb-28">
          {/* 은행명 */}
          <div>
            <label className="text-sm text-[var(--text-dark-gray)]">은행명</label>
            <div className="relative">
              <div
                className="border rounded-md px-3 py-3 bg-[var(--bg-gray)] flex justify-between items-center cursor-pointer hover:bg-[var(--bg-light-gray)]"
                onClick={() => setShowBankDropdown(!showBankDropdown)}
              >
                <span className={selectedBank ? "text-[var(--text-black)]" : "text-[var(--text-gray)]"}>
                  {selectedBank ? selectedBank.name : "은행명 선택"}
                </span>
                <DownOutlined className="text-[var(--icon-gray)]" />
              </div>
              {showBankDropdown && (
                <ul className="absolute z-10 mt-1 w-full max-h-[220px] overflow-y-auto border rounded-md bg-[var(--bg-white)] shadow-lg">
                  {BANK_LIST.map((bank) => (
                    <li
                      key={bank.code}
                      className="px-3 py-2 hover:bg-[var(--bg-gray)] cursor-pointer"
                      onClick={() => {
                        setSelectedBank(bank);
                        setShowBankDropdown(false);
                      }}
                    >
                      {bank.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* 계좌번호 */}
          <div>
            <label className="text-sm text-[var(--text-dark-gray)]">계좌번호</label>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              className="w-full border rounded-md px-3 py-3 bg-[var(--bg-gray)] focus:outline-none"
              placeholder="계좌번호 입력"
            />
          </div>

          {/* 예금주 */}
          <div>
            <label className="text-sm text-[var(--text-dark-gray)]">예금주</label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full border rounded-md px-3 py-3 bg-[var(--bg-gray)] focus:outline-none"
              placeholder="예금주 입력"
            />
          </div>

          {errorMessage && <p className="text-[var(--icon-red)] text-sm">{errorMessage}</p>}
          <button
            onClick={handleSaveClick}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-md py-4 rounded-full text-[var(--text-white)] text-base bg-[var(--bg-black)] hover:bg-[var(--bg-dark-gray)] transition"
          >
            저장하기
          </button>
        </div>
      )}

      {saved && (
        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[var(--text-dark-gray)]">은행명</label>
              <div className="border rounded-md px-3 py-3 bg-[var(--bg-gray)]">{selectedBank?.name}</div>
            </div>
            <div>
              <label className="text-sm text-[var(--text-dark-gray)]">계좌번호</label>
              <div className="border rounded-md px-3 py-3 bg-[var(--bg-gray)]">{accountNumber}</div>
            </div>
            <div>
              <label className="text-sm text-[var(--text-dark-gray)]">예금주</label>
              <div className="border rounded-md px-3 py-3 bg-[var(--bg-gray)]">{owner}</div>
            </div>
          </div>
          <button
            disabled
            className="w-full py-4 rounded-full text-[var(--text-white)] text-base bg-[var(--bg-dark-gray)] cursor-not-allowed"
          >
            저장하기
          </button>
        </div>
      )}

      {/* 약관 동의 모달 */}
      {showConsentModal && (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.95)] flex items-end justify-center">
          <div className="mb-12 w-full max-w-md rounded-t-3xl bg-[var(--bg-white)] p-6 border-t border-[var(--border-light-gray)] max-h-[80vh] overflow-y-auto">
            {/* 상단 헤더 */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold flex-1 text-center">약관 동의</h2>
              <button
                onClick={() => {
                  setShowConsentModal(false);
                  document.body.style.overflow = "auto";
                }}
                aria-label="닫기"
                className="text-[var(--text-gray)] text-lg ml-2"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={allAgreed}
                  onChange={handleAgreeAll}
                  className="mr-2"
                />
                <span className="font-medium">모두 동의</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={required1}
                    onChange={() => setRequired1(!required1)}
                    className="mr-2"
                  />
                  (필수) 가품, 보세 상품판매를 금지합니다.
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={required2}
                    onChange={() => setRequired2(!required2)}
                    className="mr-2"
                  />
                  (필수) 목적과 맞지 않는 게시물을 금지합니다.
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={optional}
                    onChange={() => setOptional(!optional)}
                    className="mr-2"
                  />
                  (선택) 마케팅 정보 수신 동의합니다.
                </div>
              </div>

              <button
                onClick={handleConsentComplete}
                disabled={!required1 || !required2}
                className={`w-full mt-8 py-3 rounded-full text-base ${
                  required1 && required2
                    ? "text-[var(--text-white)] bg-[var(--bg-black)] hover:bg-[var(--bg-dark-gray)]"
                    : "text-[var(--text-gray)] bg-[var(--bg-light-gray)] cursor-not-allowed"
                } transition`}
              >
                환영합니다!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 등록 완료 모달 */}
      {showCompleteModal && (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.85)] flex items-center justify-center">
          <div className="bg-[var(--bg-white)] rounded-lg p-6 w-72 text-center">
            <p className="mb-6 text-[16px]">계좌번호가 등록되었습니다.</p>
            <button
              onClick={handleConfirmComplete}
              className="text-blue-600 font-semibold text-[16px]"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
