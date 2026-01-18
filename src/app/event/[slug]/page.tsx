import EventDetailPage from '@/ui/components/event/EventDetailPage';
import FloatingActionButton from '@/ui/components/common/FloatingActionButton';

type PageParams = Promise<{ slug: string }>;

export default async function EventDetailRoutePage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;

  return (
    <div
      id="scrollable-container"
      className="scrollbar-hide"
      style={{
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        scrollBehavior: 'smooth',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <EventDetailPage slug={slug} />
        <FloatingActionButton />
      </div>
    </div>
  );
}
