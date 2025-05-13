"use client";
import { useSearchParams } from "next/navigation";
import Category from '@/ui/components/category/CategoryPage';
import FloatingActionButton from '@/ui/components/common/FloatingActionButton';


export default function ProductCategoryPage({ categoryCode }: { categoryCode: string }) {
  const searchParams = useSearchParams();
  const gf = searchParams.get("gf") || "A";

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
      <Category />
      <FloatingActionButton />
    </div>
  );
}
