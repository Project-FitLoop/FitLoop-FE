import WelcomeCouponPage from '@/ui/components/coupon/WelcomeCouponPage';
import FloatingActionButton from '@/ui/components/common/FloatingActionButton';

export const dynamic = 'force-dynamic';

export default function WelcomeCouponRoutePage() {
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
        <WelcomeCouponPage />
        <FloatingActionButton />
      </div>
    </div>
  );
}
