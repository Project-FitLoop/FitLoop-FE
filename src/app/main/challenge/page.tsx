import FloatingActionButton from '@/ui/components/common/FloatingActionButton';

export default function ChallengePage() {
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
        <h2 className="text-lg font-semibold mb-4">챌린지 탭입니다</h2>
        <p>여기에 챌린지 관련 콘텐츠를 추가할 예정입니다.</p>
      </div>
      <FloatingActionButton />
    </div>
  );
}
