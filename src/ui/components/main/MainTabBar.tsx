'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: '홈', path: '/main/home' },
  { name: '챌린지', path: '/main/challenge' },
  { name: '상품', path: '/main/product' },
];

export default function MainTabBar() {
  const pathname = usePathname();

  return (
    <div className="relative bg-[#FAFAFA]">
      {/* 탭 텍스트 영역 */}
      <div className="flex justify-around relative z-10">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className="flex flex-col items-center pt-0 pb-2 flex-1 relative"
            >
              <span
                className={`text-sm ${
                  isActive ? 'text-[#2E2E2E] font-semibold' : 'text-[#D1D1D1]'
                }`}
              >
                {tab.name}
              </span>
              {isActive && (
                <div className="absolute bottom-[-1px] h-[2px] w-[60px] bg-[#4A4A1E] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>

      {/* 구분선 (회색 라인) */}
      <div className="absolute bottom-0 w-full h-[1px] bg-[#E0E0E0] z-0" />
    </div>
  );
}
