"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import type { AnimationConfigWithData } from "lottie-web";

export default function CompleteRegister() {
  const router = useRouter();
  const [animationData, setAnimationData] = useState<AnimationConfigWithData["animationData"] | null>(null);

  useEffect(() => {
    fetch("/success.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 relative">
      {/* 좌측 상단 X 버튼 */}
      <button
        className="absolute top-4 left-4 text-4xl p-2 leading-none text-[color:var(--icon-black)]"
        onClick={() => router.push("/myshop")}
        aria-label="닫기"
      >
        ×
      </button>

      {/* Lottie 애니메이션 */}
      <div className="w-40 h-40">
        {animationData && <Lottie animationData={animationData} loop={false} />}
      </div>

      {/* 메시지 */}
      <h2 className="text-2xl font-semibold mt-6 text-[color:var(--text-black)]">
        상품 등록 완료!
      </h2>
      <p className="mt-2 text-[color:var(--text-dark-gray)]">
        상품 등록이 완료되었습니다.
      </p>

      {/* 버튼들 */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => router.push("/products/register")}
          className="bg-[color:var(--bg-gray)] text-[color:var(--text-black)] px-5 py-2 rounded-full"
        >
          다른 상품 올리기
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-[color:var(--bg-gray)] text-[color:var(--text-black)] px-5 py-2 rounded-full"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
