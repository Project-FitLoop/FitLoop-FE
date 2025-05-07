import Category from '@/ui/components/category/Category';
import FloatingActionButton from "@/ui/components/common/FloatingActionButton";

export default function CategoryPage() {
  return (
    <div
      id="scrollable-container"
      style={{
        height: '100vh',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
      }}
      className="scrollbar-hide"
    >
      <Category />
      <FloatingActionButton />
    </div>
  );
}
