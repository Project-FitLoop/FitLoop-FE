import Header from '@/ui/components/header/Header';
import FilterTabs from '@/ui/components/header/FilterTabs';

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center bg-[color:var(--bg-white)] min-h-screen">
      <div className="w-full max-w-[400px] flex flex-col h-screen bg-white">
        {/* 상단 헤더 */}
        <Header title="상품" />

        {/* 인기 / 최근 등록 / 카테고리별 탭 */}
        <FilterTabs />

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto scrollbar-hide">{children}</main>
      </div>
    </div>
  );
}
