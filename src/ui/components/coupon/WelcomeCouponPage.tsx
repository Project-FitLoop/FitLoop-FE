'use client';

import { useRouter } from 'next/navigation';

export default function WelcomeCouponPage() {
  const router = useRouter();

  const handleClaimAll = () => {
    alert('웰컴 쿠폰팩이 발급되었습니다. 마이페이지 > 쿠폰함에서 확인하세요.');
    router.push('/coupon');
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #f5f5ff 0%, var(--bg-gray) 40%)',
      }}
    >
      {/* 상단 헤더 */}
      <header className="px-4 pt-4 pb-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-gray-500">WELCOME BENEFIT</p>
          <h1 className="text-lg font-semibold mt-1">웰컴 쿠폰팩</h1>
        </div>
        <span className="text-[11px] px-2 py-1 rounded-full bg-white shadow-sm text-gray-600 border border-gray-100">
          신규 회원 전용
        </span>
      </header>

      {/* 히어로 영역 */}
      <section className="px-4 mb-4">
        <div className="w-full rounded-2xl px-4 py-3 shadow-sm"
          style={{ background: 'var(--bg-white)' }}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">첫 거래 전용 혜택</p>
              <p className="text-sm font-semibold mb-1">
                가입만 해도 최대 <span className="text-[15px] text-purple-600">10,000원 상당</span> 혜택
              </p>
              <p className="text-[11px] text-gray-500">
                결제 전, 쿠폰함에서 한 번에 적용해 보세요.
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[11px] text-gray-400 mb-1">보유 예정 쿠폰</span>
              <span className="text-xl font-bold tracking-tight text-purple-600">
                3<span className="text-[13px] ml-0.5 text-gray-500">장</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 쿠폰 카드 리스트 */}
      <main className="px-4 pb-8 space-y-4">
        <section
          className="rounded-2xl p-4 shadow-sm space-y-3"
          style={{ background: 'var(--bg-white)' }}
        >
          <p className="text-xs font-semibold text-gray-500 mb-1">
            포함된 쿠폰
          </p>

          <div className="space-y-2">
            {/* 쿠폰 1 */}
            <div className="flex items-center justify-between rounded-xl px-3 py-2 border border-gray-100 bg-gradient-to-r from-purple-50 to-white">
              <div>
                <p className="text-sm font-semibold">첫 구매 3,000원 할인</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  최소 결제금액 20,000원 이상
                </p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-white border border-purple-100 text-purple-600">
                첫 구매 전용
              </span>
            </div>

            {/* 쿠폰 2 */}
            <div className="flex items-center justify-between rounded-xl px-3 py-2 border border-gray-100 bg-white">
              <div>
                <p className="text-sm font-semibold">배송비 2,000원 할인</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  전 카테고리 공통 사용 가능
                </p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600">
                배송비 지원
              </span>
            </div>

            {/* 쿠폰 3 */}
            <div className="flex items-center justify-between rounded-xl px-3 py-2 border border-gray-100 bg-white">
              <div>
                <p className="text-sm font-semibold">
                  룩북/챌린지 참여 추가 5% 할인
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  참여 후 7일 이내 사용 가능
                </p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600">
                참여 리워드
              </span>
            </div>
          </div>

          <div className="mt-2 text-[11px] text-gray-500 space-y-1">
            <p>· 웰컴 쿠폰팩은 최초 가입 회원에 한해 1회만 발급됩니다.</p>
            <p>· 유효기간 및 사용 조건은 마이페이지 &gt; 쿠폰함에서 확인할 수 있습니다.</p>
          </div>
        </section>

        {/* 사용 방법 / 안내 섹션 */}
        <section
          className="rounded-2xl p-4 shadow-sm space-y-3"
          style={{ background: 'var(--bg-white)' }}
        >
          <p className="text-xs font-semibold text-gray-500">
            어떻게 사용하나요?
          </p>
          <ol className="mt-1 space-y-1 text-[12px] text-gray-700 list-decimal pl-4">
            <li>관심 상품을 장바구니에 담아요.</li>
            <li>결제 단계에서 사용 가능한 쿠폰을 선택해요.</li>
            <li>적용된 할인 금액을 확인한 뒤 결제하면 끝!</li>
          </ol>

          <div className="mt-3 rounded-lg px-3 py-2 bg-gray-50 text-[11px] text-gray-600">
            <p className="font-medium mb-1">자주 묻는 질문</p>
            <p>Q. 이미 가입한 적이 있는데, 다시 발급 받을 수 있나요?</p>
            <p className="mt-0.5">
              A. 웰컴 쿠폰팩은 한 계정당 1회만 발급 가능합니다.
            </p>
          </div>
        </section>
      </main>

      {/* 하단 고정 CTA 버튼 */}
      <div className="fixed left-0 right-0 bottom-0 px-4 pb-4 pt-2"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #f5f5f5 35%, #f5f5f5 100%)' }}
      >
        <button
          className="w-full py-3 rounded-full text-sm font-semibold shadow-md active:opacity-90"
          style={{
            background: 'var(--primary)',
            color: 'var(--bg-white)',
          }}
          onClick={handleClaimAll}
        >
          웰컴 쿠폰팩 한 번에 받기
        </button>
        <p className="mt-1 text-[10px] text-center text-gray-500">
          발급된 쿠폰은 마이페이지 &gt; 쿠폰함에서 언제든 확인할 수 있어요.
        </p>
      </div>
    </div>
  );
}
