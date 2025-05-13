import Popular from '@/ui/components/popularity/PopularityPage';
import FloatingActionButton from '@/ui/components/common/FloatingActionButton';

export default function PopularityPage() {
  return (
    <div
      id="scrollable-container"
      style={{
        height: '100vh',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
      }
      } className="scrollbar-hide"
    >
      <Popular />
      <FloatingActionButton />
    </div>
  );
}