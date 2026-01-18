"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CouponRegisterForm from "@/ui/components/coupon/CouponRegisterForm";
import { fetchMyCreatedCoupons } from "@/services/api/couponApi";

type Tab = "product" | "look" | "challenge" | "like" | "bookmark";
type Filter = "all" | "selling" | "soldout";
type CouponModalMode = "list" | "create";
type CouponTab = "created" | "downloaded";
type CouponStatus = "ACTIVE" | "PAUSED" | "EXPIRED";

type CreatedCoupon = {
  id: number;
  title: string;
  discountText: string;
  minOrderText: string;
  periodText: string;
  status: CouponStatus;
  issuedCount: number;
  usedCount: number;
};

type DownloadedCoupon = {
  id: number;
  title: string;
  benefitText: string;
  periodText: string;
  stateText: string;
};

export default function MyShopPage() {
  const [activeTab, setActiveTab] = useState<Tab>("product");
  const [filter, setFilter] = useState<Filter>("all");
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [couponModalMode, setCouponModalMode] = useState<CouponModalMode>("list");
  const [couponTab, setCouponTab] = useState<CouponTab>("created");
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      setCouponModalMode("create");
      setCouponModalOpen(true);
    };
    window.addEventListener("open-coupon-modal", handler);
    return () => window.removeEventListener("open-coupon-modal", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = couponModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [couponModalOpen]);

  const handleCardClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const openCouponListModal = () => {
    setCouponTab("created");
    setCouponModalMode("list");
    setCouponModalOpen(true);
  };

  const closeCouponModal = () => {
    setCouponModalOpen(false);
  };

  const [createdCoupons, setCreatedCoupons] = useState<CreatedCoupon[]>([]);

  useEffect(() => {
    if (!couponModalOpen) return;
    if (couponModalMode !== "list") return;
    if (couponTab !== "created") return;

    (async () => {
      const data = await fetchMyCreatedCoupons();
      setCreatedCoupons(data);
    })();
  }, [couponModalOpen, couponModalMode, couponTab]);

  const [downloadedCoupons] = useState<DownloadedCoupon[]>([
    { id: 201, title: "10% 할인 쿠폰", benefitText: "10% 할인", periodText: "2026.01.31까지", stateText: "사용 가능" },
    { id: 202, title: "2,000원 할인 쿠폰", benefitText: "2,000원 할인", periodText: "2026.01.05까지", stateText: "사용 완료" },
  ]);

  const toggleCreatedCouponStatus = (id: number) => {
    setCreatedCoupons((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        if (c.status === "EXPIRED") return c;
        return { ...c, status: c.status === "ACTIVE" ? "PAUSED" : "ACTIVE" };
      })
    );
  };

  const disableCreatedCoupon = (id: number) => {
    setCreatedCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, status: "EXPIRED", periodText: "내림 처리됨" } : c)));
  };

  return (
    <div className="relative max-w-md mx-auto min-h-screen bg-white pb-[140px]">
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <header className="pt-8 px-6">
        <div className="flex items-start justify-between gap-4">
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

          <div className="flex items-center gap-2 pt-1">
            <IconButton label="쿠폰" onClick={openCouponListModal} />
          </div>
        </div>

        <div className="mt-5 text-[13px] leading-relaxed text-gray-800">
          ✨ 소개글
          <br />
          ✨ 캐주얼, 스트릿
          <br />
          ✨ 즐겨입는 브랜드 : 바온, 러브캐쳐, 꼼파뇨
        </div>

        <button className="mt-5 w-full h-9 rounded-[12px] bg-[#666666] hover:bg-[#555555] active:bg-[#4a4a4a] transition flex items-center justify-center text-[15px] text-white gap-2">
          프로필 편집
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
              className={`flex-1 pb-2 text-center whitespace-nowrap ${isActive ? "text-gray-900 font-semibold" : ""}`}
              onClick={() => setActiveTab(tab.key as Tab)}
            >
              {tab.label}
              <div className={`mt-2 h-[3px] rounded-t-full ${isActive ? "bg-gray-800 w-8 mx-auto" : "bg-transparent"}`} />
            </button>
          );
        })}
      </nav>

      {activeTab === "product" && (
        <section className="px-6 pt-4 flex gap-3 text-[13px] justify-start">
          <FilterChip label="전체" selected={filter === "all"} onClick={() => setFilter("all")} />
          <FilterChip label="판매중" selected={filter === "selling"} onClick={() => setFilter("selling")} />
          <FilterChip label="판매 완료" selected={filter === "soldout"} onClick={() => setFilter("soldout")} />
        </section>
      )}

      <main className="px-6 pt-4">
        {activeTab === "product" && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {[1, 2, 3, 4].map((idx) => (
              <button key={idx} type="button" className="w-full text-left" onClick={() => handleCardClick(idx)}>
                <div className="relative w-full bg-[#f5f5f5] rounded-[10px] aspect-square overflow-hidden">
                  <span className="absolute top-2 left-2 text-[12px] font-semibold text-gray-800 bg-white/80 px-2 py-1 rounded-full">
                    할인중
                  </span>
                </div>

                <div className="mt-3 text-[14px] text-gray-900">{idx % 2 === 1 ? "포켓 청바지" : "Y2K 가죽 자켓"}</div>
                <div className="mt-1 text-[14px] font-semibold text-gray-900">15,000원</div>

                <div className="mt-2 flex gap-2">
                  <Tag label="#Y2K" />
                  <Tag label={idx % 2 === 1 ? "#포켓" : "#가죽"} />
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === "look" && <EmptyState message="아직 등록된 룩이 없어요. 첫 번째 룩을 올려볼까요?" />}
        {activeTab === "challenge" && <EmptyState message="참여 중인 챌린지가 없습니다." />}
        {activeTab === "like" && <EmptyState message="좋아요한 상품이 없습니다." />}
        {activeTab === "bookmark" && <EmptyState message="북마크한 상품이 없습니다." />}
      </main>

      {couponModalOpen && (
        <SimpleModal onClose={closeCouponModal}>
          {couponModalMode === "create" ? (
            <div>
              <div className="flex items-center justify-between">
                <div className="text-[18px] font-semibold text-gray-900">쿠폰 발행</div>
                <button onClick={closeCouponModal} className="text-[22px] leading-none">
                  ✕
                </button>
              </div>
              <div className="mt-4">
                <CouponRegisterForm onSubmitSuccess={closeCouponModal} onCancel={closeCouponModal} />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <div className="text-[18px] font-semibold text-gray-900">쿠폰</div>
                <button onClick={closeCouponModal} className="text-[22px] leading-none">
                  ✕
                </button>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setCouponTab("created")}
                  className={`flex-1 h-9 rounded-[12px] text-[13px] border transition ${
                    couponTab === "created"
                      ? "bg-[#666666] border-[#666666] text-white"
                      : "bg-white border-[#dddddd] text-gray-700"
                  }`}
                >
                  내가 만든 쿠폰
                </button>
                <button
                  type="button"
                  onClick={() => setCouponTab("downloaded")}
                  className={`flex-1 h-9 rounded-[12px] text-[13px] border transition ${
                    couponTab === "downloaded"
                      ? "bg-[#666666] border-[#666666] text-white"
                      : "bg-white border-[#dddddd] text-gray-700"
                  }`}
                >
                  내가 받은 쿠폰
                </button>
              </div>

              <div className="mt-5">
                {couponTab === "created" ? (
                  <div className="space-y-3">
                    {createdCoupons.map((c) => {
                      const disabled = c.status === "EXPIRED";
                      const statusPill =
                        c.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : c.status === "PAUSED"
                            ? "bg-amber-50 text-amber-700 border-amber-100"
                            : "bg-gray-100 text-gray-600 border-gray-200";

                      const statusLabel = c.status === "ACTIVE" ? "노출중" : c.status === "PAUSED" ? "일시중지" : "내림/만료";

                      return (
                        <div key={c.id} className="border border-[#eeeeee] rounded-2xl p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <div className="text-[14px] font-semibold text-gray-900 truncate">{c.title}</div>
                                <span className={`shrink-0 text-[11px] px-2 py-0.5 rounded-full border ${statusPill}`}>
                                  {statusLabel}
                                </span>
                              </div>
                              <div className="mt-1 text-[12px] text-gray-700">
                                {c.discountText} · {c.minOrderText}
                              </div>
                              <div className="mt-1 text-[12px] text-gray-600">{c.periodText}</div>
                              <div className="mt-2 text-[12px] text-gray-600">
                                발급 {c.issuedCount} · 사용 {c.usedCount}
                              </div>
                            </div>

                            <div className="shrink-0 flex flex-col gap-2">
                              <button
                                type="button"
                                disabled={disabled}
                                onClick={() => toggleCreatedCouponStatus(c.id)}
                                className={`h-8 px-3 rounded-[12px] text-[12px] border transition ${
                                  disabled
                                    ? "bg-gray-100 border-gray-200 text-gray-400"
                                    : "bg-white border-[#dddddd] text-gray-700 hover:bg-[#f6f6f6] active:bg-[#eeeeee]"
                                }`}
                              >
                                {c.status === "ACTIVE" ? "일시중지" : c.status === "PAUSED" ? "노출" : "노출"}
                              </button>

                              <button
                                type="button"
                                disabled={disabled}
                                onClick={() => disableCreatedCoupon(c.id)}
                                className={`h-8 px-3 rounded-[12px] text-[12px] border transition ${
                                  disabled
                                    ? "bg-gray-100 border-gray-200 text-gray-400"
                                    : "bg-white border-[#dddddd] text-gray-700 hover:bg-[#f6f6f6] active:bg-[#eeeeee]"
                                }`}
                              >
                                내리기
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {downloadedCoupons.map((c) => (
                      <div key={c.id} className="border border-[#eeeeee] rounded-2xl p-4">
                        <div className="text-[14px] font-semibold text-gray-900">{c.title}</div>
                        <div className="mt-1 text-[12px] text-gray-700">{c.benefitText}</div>
                        <div className="mt-1 text-[12px] text-gray-600">{c.periodText}</div>
                        <div className="mt-3 flex justify-end">
                          <span className="text-[12px] text-gray-500">{c.stateText}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </SimpleModal>
      )}
    </div>
  );
}

function FilterChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-[12px] ${
        selected ? "bg-[#666666] border-[#666666] text-white" : "bg-white border-[#dddddd] text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}

function Tag({ label }: { label: string }) {
  return <span className="px-3 py-1 rounded-full bg-[#f3f3f3] text-[12px] text-gray-700">{label}</span>;
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center text-[14px] text-gray-500">
      <div className="w-16 h-16 rounded-full bg-gray-100 mb-4" />
      <p>{message}</p>
    </div>
  );
}

function IconButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-10 h-10 rounded-full bg-[#f6f6f6] hover:bg-[#ededed] active:bg-[#e3e3e3] transition flex items-center justify-center"
      aria-label={label}
      title={label}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 8.5C4 7.119 5.119 6 6.5 6H19.5C20.881 6 22 7.119 22 8.5V10.2C20.895 10.2 20 11.095 20 12.2C20 13.305 20.895 14.2 22 14.2V15.5C22 16.881 20.881 18 19.5 18H6.5C5.119 18 4 16.881 4 15.5V14.2C5.105 14.2 6 13.305 6 12.2C6 11.095 5.105 10.2 4 10.2V8.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M12 8.2V15.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2.2 2.2" />
      </svg>
    </button>
  );
}

function SimpleModal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" onMouseDown={onClose}>
      <div className="w-full max-w-[400px] bg-white rounded-2xl p-6 max-h-[85vh] overflow-y-auto scrollbar-hide" onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
