import MainTabBar from '@/ui/components/main/MainTabBar';
import SearchHeader from '@/ui/components/main/SearchHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center bg-white min-h-screen">
      <div className="w-full max-w-[400px] flex flex-col h-screen bg-[#FAFAFA]">
        {/* 상단 헤더 */}
        <SearchHeader />

        {/* 탭 바 */}
        <MainTabBar />

        {/* 콘텐츠 */}
        <main className="flex-1 overflow-y-auto scrollbar-hide pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
