export const dynamicParams = true;

import ProductDetailPage from '@/ui/components/product/ProductDetailPage';
import { fetchProductDetail } from '@/services/api/productApi';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: PageProps) {
  const { id } = await params;
  const product = await fetchProductDetail(id);
  return <ProductDetailPage product={product} />;
}
