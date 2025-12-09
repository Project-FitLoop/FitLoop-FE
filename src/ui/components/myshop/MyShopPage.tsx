"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CouponRegisterForm from "@/ui/components/coupon/CouponRegisterForm";
import { DownloadOutlined } from "@ant-design/icons";

type Tab = "product" | "look" | "challenge" | "like" | "bookmark";
type Filter = "all" | "selling" | "soldout";

export default function MyShopPage() {
  const [activeTab, setActiveTab] = useState<Tab>("product");
  const [filter, setFilter] = useState<Filter>("all");
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = () => setCouponModalOpen(true);
    window.addEventListener("open-coupon-modal", handler);
    return () => window.removeEventListener("open-coupon-modal", handler);
  }, []);

  useEffect(() => {
    if (couponModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [couponModalOpen]);
  
  const handleCardClick = (productId: number) => {
    // TODO: 실제 productId로 교체
    router.push(`/products/${productId}`);
  };

  return (
    <div className="relative max-w-md mx-auto min-h-screen bg-white pb-[140px]">
      <header className="pt-8 px-6">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 shrink-0" />

          <div className="flex flex-col">
            <div className="text-[18px] font-semibold text-gray-900 flex items-center gap-1">
              헬로우 샵 <span>🌱</span>
            </div>

            <div className="flex items-center text-[16px] text-gray-700 mt-1">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span className="text-gray-300">★</span>
              <span className="ml-1 text-[13px] text-gray-600">(30)</span>
            </div>

            <div className="flex gap-10 mt-3 text-[12px] text-gray-600">
              <div className="flex flex-col items-center">
                <span className="text-[15px] font-semibold text-gray-900">100</span>
                <span>올린 상품</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[15px] font-semibold text-gray-900">100</span>
                <span>판매내역</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[15px] font-semibold text-gray-900">34</span>
                <span>구매내역</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 text-[13px] leading-relaxed text-gray-800">
          ✨ 소개글
          <br />
          ✨ 캐주얼, 스트릿
          <br />
          ✨ 즐겨입는 브랜드 : 바온, 러브캐쳐, 꼼파뇨
        </div>

        {/* 쿠폰 버튼 */}
        <button className="mt-5 w-full h-9 rounded-[12px] bg-[#f3f3f3] flex items-center justify-center text-[15px] text-gray-700 gap-2">
          <DownloadOutlined style={{ fontSize: "18px", color: "#555" }} />
          쿠폰 내려 받기
        </button>
      </header>

      <nav className="mt-6 border-b border-gray-200 flex text-[14px] text-gray-500">
        {[
          { key: "product", label: "상품" },
          { key: "look", label: "룩" },
          { key: "challenge", label: "챌린지" },
          { key: "like", label: "좋아요" },
          { key: "bookmark", label: "북마크" },
        ].map((tab) => {
          const isActive = activeTab === (tab.key as Tab);
          return (
            <button
              key={tab.key}
              className={`flex-1 pb-2 text-center whitespace-nowrap ${
                isActive ? "text-gray-900 font-semibold" : ""
              }`}
              onClick={() => setActiveTab(tab.key as Tab)}
            >
              {tab.label}
              <div
                className={`mt-2 h-[3px] rounded-t-full ${
                  isActive ? "bg-gray-800 w-8 mx-auto" : "bg-transparent"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {activeTab === "product" && (
        <section className="px-6 pt-4 flex gap-3 text-[13px] justify-start">
          <FilterChip
            label="전체"
            selected={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <FilterChip
            label="판매중"
            selected={filter === "selling"}
            onClick={() => setFilter("selling")}
          />
          <FilterChip
            label="판매 완료"
            selected={filter === "soldout"}
            onClick={() => setFilter("soldout")}
          />
        </section>

      )}


      <main className="px-6 pt-4">
        {activeTab === "product" && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {[1, 2, 3, 4].map((idx) => (
              <button
                key={idx}
                type="button"
                className="w-full text-left"
                onClick={() => handleCardClick(idx)}
              >
                <div className="relative w-full bg-[#f5f5f5] rounded-[10px] aspect-square overflow-hidden">
                  <span className="absolute top-2 left-2 text-[12px] font-semibold text-gray-800 bg-white/80 px-2 py-1 rounded-full">
                    할인중
                  </span>
                </div>

                <div className="mt-3 text-[14px] text-gray-900">
                  {idx % 2 === 1 ? "포켓 청바지" : "Y2K 가죽 자켓"}
                </div>
                <div className="mt-1 text-[14px] font-semibold text-gray-900">
                  15,000원
                </div>

                <div className="mt-2 flex gap-2">
                  <Tag label="#Y2K" />
                  <Tag label={idx % 2 === 1 ? "#포켓" : "#가죽"} />
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === "look" && (
          <EmptyState message="아직 등록된 룩이 없어요. 첫 번째 룩을 올려볼까요?" />
        )}

        {activeTab === "challenge" && (
          <EmptyState message="참여 중인 챌린지가 없습니다." />
        )}

        {activeTab === "like" && (
          <EmptyState message="좋아요한 상품이 없습니다." />
        )}

        {activeTab === "bookmark" && (
          <EmptyState message="북마크한 상품이 없습니다." />
        )}
      </main>

      {couponModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-[400px] bg-white rounded-2xl p-6 max-h-[85vh] overflow-y-auto scrollbar-hide">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-semibold">쿠폰 발행</h2>
              <button
                onClick={() => setCouponModalOpen(false)}
                className="text-[22px] leading-none"
              >
                ✕
              </button>
            </div>

            <CouponRegisterForm
              onSubmitSuccess={() => setCouponModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-[12px] ${
        selected
          ? "bg-[#666666] border-[#666666] text-white"
          : "bg-white border-[#dddddd] text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 rounded-full bg-[#f3f3f3] text-[12px] text-gray-700">
      {label}
    </span>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center text-[14px] text-gray-500">
      <div className="w-16 h-16 rounded-full bg-gray-100 mb-4" />
      <p>{message}</p>
    </div>
  );
}
