import MyShopPage from '@/ui/components/myshop/MyShopPage';
import FloatingActionButton from '@/ui/components/common/FloatingActionButton';

export default function MyShopRoutePage() {
  return (
    <div
      id="scrollable-container"
      className="scrollbar-hide"
      style={{
        height: '100vh',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
      }}
    >
      <div
        style={{ width: '100%', maxWidth: '400px' }}
        className="mx-auto relative"
      >
        <MyShopPage />
        <FloatingActionButton />
      </div>
    </div>
  );
}
