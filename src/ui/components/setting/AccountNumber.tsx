"use client";

import React, { useState, useEffect } from "react";
import { BANK_LIST } from "@/data/bankList";
import { useRouter } from "next/navigation";
import { LeftOutlined, DownOutlined } from "@ant-design/icons";
import { saveAccountSetting } from "@/services/api/setting";

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

  const [showDetail1, setShowDetail1] = useState(false);
  const [showDetail2, setShowDetail2] = useState(false);
  const [showDetailOptional, setShowDetailOptional] = useState(false);

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

  // 약관 동의 완료 (API 호출)
  const handleConsentComplete = async () => {
    if (!required1 || !required2) {
      alert("필수 항목을 모두 동의해주세요.");
      return;
    }

    try {
      await saveAccountSetting({
        bankName: selectedBank!.name,
        accountNumber,
        depositor: owner,
      });

      setShowConsentModal(false);
      setShowCompleteModal(true);
      document.body.style.overflow = "auto";
    } catch (error) {
      console.error(error);
      alert("계좌정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 등록 완료 확인
  const handleConfirmComplete = () => {
    setShowCompleteModal(false);
    setSaved(true);
    router.back();
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
            onClick={handleSaveClick}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-[393px] py-4 rounded-full text-[var(--text-white)] text-base bg-[var(--bg-black)] hover:bg-[var(--bg-dark-gray)] transition"
          >
            저장하기
          </button>
        </div>
      )}

      {/* 약관 동의 모달 */}
      {showConsentModal && (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.55)] flex items-end justify-center">
          <div className="mb-12 w-full max-w-[393px] rounded-t-3xl bg-[var(--bg-white)] p-6 border-t border-[var(--border-light-gray)] max-h-[80vh] overflow-y-auto">
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
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={required1}
                        onChange={() => setRequired1(!required1)}
                        className="mr-2"
                      />
                      (필수) 계좌정보 수집 및 이용 동의
                    </label>
                    <button
                      onClick={() => setShowDetail1(!showDetail1)}
                      className="text-xs text-blue-500 ml-2"
                    >
                      {showDetail1 ? "닫기" : "자세히 보기"}
                    </button>
                  </div>
                  {showDetail1 && (
                    <p className="mt-1 ml-6 text-[var(--text-gray)] text-xs">
                      등록한 계좌정보는 출금계좌 등록 및 본인확인 목적으로 사용되며, 관련 법령에 따라 보관됩니다.
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={required2}
                        onChange={() => setRequired2(!required2)}
                        className="mr-2"
                      />
                      (필수) 제3자 제공 동의
                    </label>
                    <button
                      onClick={() => setShowDetail2(!showDetail2)}
                      className="text-xs text-blue-500 ml-2"
                    >
                      {showDetail2 ? "닫기" : "자세히 보기"}
                    </button>
                  </div>
                  {showDetail2 && (
                    <p className="mt-1 ml-6 text-[var(--text-gray)] text-xs">
                        본인 확인을 위해 해당 계좌정보를 금융기관 등 제3자에게 제공할 수 있음에 동의합니다.
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={optional}
                        onChange={() => setOptional(!optional)}
                        className="mr-2"
                      />
                      (선택) 마케팅 정보 수신 동의합니다.
                    </label>
                    <button
                      onClick={() => setShowDetailOptional(!showDetailOptional)}
                      className="text-xs text-blue-500 ml-2"
                    >
                      {showDetailOptional ? "닫기" : "자세히 보기"}
                    </button>
                  </div>
                  {showDetailOptional && (
                    <p className="mt-1 ml-6 text-[var(--text-gray)] text-xs">
                      이메일, 문자 등을 통한 이벤트 및 프로모션 정보를 받아볼 수 있습니다.
                    </p>
                  )}
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
              className="text-blue-600 font-semibold text-[16px]">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
