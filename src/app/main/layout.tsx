import Image from 'next/image';
import MainTabBar from '@/ui/components/main/MainTabBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center bg-white min-h-screen">
      <div className="w-full max-w-[400px] flex flex-col h-screen bg-[#FAFAFA]">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#FAFAFA]">
          {/* 로고 (왼쪽으로 -30px 이동 + 위쪽 여백) */}
          <div className="h-[36px] overflow-hidden flex items-center ml-[-30px] mt-2">
            <Image
              src="/logo.svg"
              alt="로고"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[160px] h-[56px] object-cover"
              priority
            />
          </div>

          {/* 아이콘 */}
          <div className="flex space-x-4 items-center">
            <button>
              <Image
                src="/assets/product-tab/search.svg"
                alt="검색"
                width={24}
                height={24}
              />
            </button>
            <button>
              <Image
                src="/assets/product-tab/shopping-bag.svg"
                alt="장바구니"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        {/* 탭 바 */}
        <MainTabBar />

        {/* 콘텐츠 */}
        <main className="flex-1 overflow-y-auto scrollbar-hide pb-0">{children}</main>
      </div>
    </div>
  );
}
