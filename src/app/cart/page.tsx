'use client';

import Header from '@/ui/components/header/Header';
import CartPage from '@/ui/components/cart/CartPage';

export default function Page() {
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
        <Header title="장바구니" />
        <CartPage />
      </div>
    </div>
  );
}
