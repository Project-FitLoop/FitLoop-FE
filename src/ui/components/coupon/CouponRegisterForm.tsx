"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DiscountType = "FIXED";

interface CouponRegisterFormProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
}

const CouponRegisterForm = ({
  onSubmitSuccess,
  onCancel,
}: CouponRegisterFormProps) => {
  const router = useRouter();
  const [onlyFirstTime, setOnlyFirstTime] = useState(true);
  const [discountType] = useState<DiscountType>("FIXED");
  const [minOrderAmount, setMinOrderAmount] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [maxDiscountAmount, setMaxDiscountAmount] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      onlyFirstTime,
      discountType,
      minOrderAmount,
      discountAmount,
      maxDiscountAmount,
      validFrom,
      validTo,
    });

    alert("쿠폰 발행 로직 부탁드려요🙂");

    if (onSubmitSuccess) {
      onSubmitSuccess();
    } else {
      router.back();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

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
              />
              <span>마이샵 첫 주문 고객에게만 쿠폰을 발급합니다.</span>
            </label>
            <label className="flex items-center gap-2 cursor-not-allowed text-gray-400">
            <input
                type="radio"
                name="onlyFirstTime"
                checked={false}
                disabled
                className="accent-black"
            />
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
          <p className="text-[12px] text-gray-600">
            주문 금액에서 지정한 금액만큼 그대로 차감되는 방식입니다.
          </p>

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
              />
              <span className="text-[13px] text-gray-700">원</span>
            </div>
            <p className="mt-1 text-[12px] text-gray-500">
              고객 결제 금액에서 입력한 금액만큼 차감됩니다.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[14px] font-semibold">사용 조건</h2>
          <p className="text-[12px] text-gray-600">
            최소 주문 금액과 최대 할인 금액을 설정해 할인 폭을 조절해 주세요.
          </p>

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
              />
              <span className="text-[13px] text-gray-700">원</span>
            </div>
            <p className="mt-1 text-[12px] text-gray-500">
              이 금액 이상 주문하는 경우에만 쿠폰이 적용됩니다.
            </p>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
              최대 할인 금액
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={maxDiscountAmount}
                onChange={(e) => setMaxDiscountAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="예: 5000"
              />
              <span className="text-[13px] text-gray-700">원</span>
            </div>
            <p className="mt-1 text-[12px] text-gray-500">
              주문 금액이 높더라도 이 금액을 초과해서 할인되지는 않습니다.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[14px] font-semibold">쿠폰 유효 기간</h2>
          <p className="text-[12px] text-gray-600">
            쿠폰이 노출되고 사용할 수 있는 기간을 지정해 주세요.
          </p>

          <div>
            <label className="block text-[13px] font-medium text-gray-800 mb-1.5">
              유효 시작 일시
            </label>
            <input
              type="datetime-local"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-black"
            />
            <p className="mt-1 text-[12px] text-gray-500">
              이 시점부터 쿠폰이 고객에게 노출되고 사용 가능합니다.
            </p>
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
            />
            <p className="mt-1 text-[12px] text-gray-500">
              설정한 시간이 지나면 쿠폰은 자동으로 만료 처리됩니다.
            </p>
          </div>
        </section>

        <div className="pt-2 flex gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 h-11 rounded-full border border-gray-300 text-[14px] text-gray-700"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 h-11 rounded-full bg-black text-white text-[14px] font-medium"
          >
            쿠폰 발행하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default CouponRegisterForm;
