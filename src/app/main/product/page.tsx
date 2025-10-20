import FloatingActionButton from '@/ui/components/common/FloatingActionButton';

export default function ProductPage() {
  return (
    <div
      id="scrollable-container"
      style={{
        height: '100vh',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
      }}
      className="scrollbar-hide"
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">상품 탭입니다</h2>
        <p>상품 목록, 필터, 추천 아이템 등을 여기에 구현 예정입니다.</p>
      </div>
      <FloatingActionButton />
    </div>
  );
}
