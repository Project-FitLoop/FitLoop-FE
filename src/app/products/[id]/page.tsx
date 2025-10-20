export const dynamic = 'force-dynamic';

import ProductDetailPage from '@/ui/components/product/ProductDetailPage';
import { fetchProductDetail } from '@/services/api/productApi';

type PageParams = Promise<{ id: string }>;

export default async function ProductDetail({
  params,
}: {
  params: PageParams;
}) {
  const { id } = await params;
  const product = await fetchProductDetail(id);

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
        <ProductDetailPage product={product} />
      </div>
    </div>
  );
}
