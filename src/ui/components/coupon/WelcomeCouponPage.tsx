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
      className="px-4 py-6"
      style={{ background: 'var(--bg-gray)', minHeight: '100vh' }}
    >
      <h1 className="text-lg font-semibold mb-4">웰컴 쿠폰팩</h1>

      <section
        className="rounded-md p-4 mb-4"
        style={{ background: 'var(--bg-white)' }}
      >
        <p className="text-sm mb-1">
          Fitloop에 가입해 주셔서 감사합니다.
        </p>
        <p className="text-sm text-gray-600 mb-4">
          첫 거래를 위한 전용 혜택을 한 번에 받아보세요.
        </p>

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-1">
            포함된 쿠폰
          </p>
          <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
            <li>첫 구매 3,000원 할인 쿠폰</li>
            <li>배송비 2,000원 할인 쿠폰</li>
            <li>룩북/챌린지 참여 시 추가 5% 할인 쿠폰</li>
          </ul>
        </div>

        <div className="mb-2 text-xs text-gray-500">
          <p>· 웰컴 쿠폰팩은 최초 가입 회원에 한해 1회만 발급됩니다.</p>
          <p>· 유효기간 및 사용 조건은 쿠폰 상세에서 확인할 수 있습니다.</p>
        </div>

        <button
          className="mt-4 w-full py-2 rounded-md text-sm font-semibold"
          style={{
            background: 'var(--primary)',
            color: 'var(--bg-white)',
          }}
          onClick={handleClaimAll}
        >
          웰컴 쿠폰팩 한 번에 받기
        </button>
      </section>
    </div>
  );
}
