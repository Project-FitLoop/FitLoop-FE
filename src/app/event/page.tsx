import EventListPage from '@/ui/components/event/EventListPage';
import FloatingActionButton from '@/ui/components/common/FloatingActionButton';

export default function EventListRoutePage() {
  return (
    <div
      id="scrollable-container"
      className="scrollbar-hide"
      style={{
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        scrollBehavior: 'smooth',
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <EventListPage />
        <FloatingActionButton />
      </div>
    </div>
  );
}
