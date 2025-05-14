"use client";
import Category from '@/ui/components/category/CategoryPage';
import FloatingActionButton from '@/ui/components/common/FloatingActionButton';


export default function ProductCategoryPage() {

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
