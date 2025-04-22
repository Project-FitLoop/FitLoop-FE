import Recent from '@/ui/components/recent/RecentPage';
import FloatingActionButton from '@/ui/components/common/FloatingActionButton';

export default function RecentPage() {
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
      <Recent />
      <FloatingActionButton />
    </div>
  );
}
