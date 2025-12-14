"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { registerCoupon } from "@/services/api/couponApi";
import type { CouponRegisterPayload, DiscountType } from "@/services/api/couponApi";

interface CouponRegisterFormProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
}

const CouponRegisterForm = ({ onSubmitSuccess, onCancel }: CouponRegisterFormProps) => {
  const router = useRouter();

  const [onlyFirstTime, setOnlyFirstTime] = useState(true);
  const [discountType] = useState<DiscountType>("FIXED");
  const [minOrderAmount, setMinOrderAmount] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      if (!onlyFirstTime) throw new Error("현재는 첫 주문 고객 대상 쿠폰만 발급할 수 있습니다.");
      if (!discountAmount) throw new Error("할인 금액을 입력해주세요.");
      if (!minOrderAmount) throw new Error("최소 주문 금액을 입력해주세요.");
      if (!validFrom || !validTo) throw new Error("쿠폰 유효 기간을 설정해주세요.");

      const discountValue = Number(discountAmount);
      const minOrderValue = Number(minOrderAmount);

      if (Number.isNaN(discountValue) || discountValue <= 0)
        throw new Error("할인 금액을 올바르게 입력해주세요.");
      if (Number.isNaN(minOrderValue) || minOrderValue < 0)
        throw new Error("최소 주문 금액을 올바르게 입력해주세요.");

      const validFromISO = new Date(validFrom).toISOString();
      const validToISO = new Date(validTo).toISOString();

      if (new Date(validFromISO).getTime() >= new Date(validToISO).getTime()) {
        throw new Error("유효 시작 일시는 유효 종료 일시보다 이전이어야 합니다.");
      }

      const payload: CouponRegisterPayload = {
        couponName: "WELCOME 쿠폰",
        description: "마이샵 첫 방문 고객 대상 웰컴 쿠폰",
        discountType,
        discountValue,
        minOrderValue,
        maxDiscount: 0,
        validFrom: validFromISO,
        validTo: validToISO,
      };

      await registerCoupon(payload);

      message.success("쿠폰이 성공적으로 등록되었어요!");

      if (onSubmitSuccess) onSubmitSuccess();
      else router.back();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        err?.message ??
        "쿠폰 발행에 실패했습니다.";

      message.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else router.back();
  };

  // ✅ indent 에러 방지용: className 삼항식을 변수로 분리
  const cancelBtnClass = `flex-1 h-11 rounded-full border text-[14px] ${
    isSubmitting
      ? "border-gray-200 text-gray-300 cursor-not-allowed"
      : "border-gray-300 text-gray-700"
  }`;

  const submitBtnClass = `flex-1 h-11 rounded-full text-[14px] font-medium ${
    isSubmitting ? "bg-gray-300 text-white cursor-not-allowed" : "bg-black text-white"
  }`;

  return (
    <div className="pt-4 pb-2 text-gray-900">
      <header className="mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-black text-white px-3 py-1 text-[11px] font-medium">
          <span>WELCOME 쿠폰</span>
        </div>
        <h1 className="text-[20px] font-semibold mt-2">웰컴 쿠폰 설정</h1>
        <p className="mt-1 text-[12px] text-gray-600 leading-relaxed">
          마이샵을 처음 방문한 고객에게 한 번만 제공되는 웰컴 쿠폰이에요.
          <br />
          할인 기준과 유효 기간을 설정해 나만의 환영 혜택을 만들어 보세요.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-2xl bg-[#f7f7f7] px-4 py-4">
          <h2 className="text-[14px] font-semibold">쿠폰 대상 설정</h2>
          <p className="mt-1 text-[12px] text-gray-600">
            웰컴 쿠폰은 기본적으로 첫 주문 고객에게만 노출돼요.
          </p>
          <div className="mt-4 space-y-2 text-[13px]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="onlyFirstTime"
                checked={onlyFirstTime}
                onChange={() => setOnlyFirstTime(true)}
                className="accent-black"
                disabled={isSubmitting}
              />
              <span>마이샵 첫 주문 고객에게만 쿠폰을 발급합니다.</span>
            </label>

            <label className="flex items-center gap-2 cursor-not-allowed text-gray-400">
              <input type="radio" disabled className="accent-black" />
              <span>모든 고객에게 발급 (추후 확장 예정)</span>
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-semibold">할인 정보</h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] bg-black text-white">
              정액 할인
            </span>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
              할인 금액
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="예: 3000"
                disabled={isSubmitting}
              />
              <span className="text-[13px] text-gray-700">원</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[14px] font-semibold">사용 조건</h2>

          <div>
            <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
              최소 주문 금액
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={minOrderAmount}
                onChange={(e) => setMinOrderAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="예: 20000"
                disabled={isSubmitting}
              />
              <span className="text-[13px] text-gray-700">원</span>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
              최대 할인 금액
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                disabled
                value=""
                onChange={() => {}}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-[14px] bg-gray-100 text-gray-400 cursor-not-allowed"
                placeholder="최대 할인 금액 (추후 확장 예정)"
              />
              <span className="text-[13px] text-gray-400">원</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[14px] font-semibold">쿠폰 유효 기간</h2>

          <div>
            <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
              유효 시작 일시
            </label>
            <input
              type="datetime-local"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-black"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
              유효 종료 일시
            </label>
            <input
              type="datetime-local"
              value={validTo}
              onChange={(e) => setValidTo(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-black"
              disabled={isSubmitting}
            />
          </div>
        </section>

        <div className="pt-2 flex gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className={cancelBtnClass}
          >
            취소
          </button>
          <button type="submit" disabled={isSubmitting} className={submitBtnClass}>
            {isSubmitting ? "발행 중..." : "쿠폰 발행하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CouponRegisterForm;
