import Category from '@/ui/components/category/Category';
import FloatingActionButton from "@/ui/components/common/FloatingActionButton";

export default function CategoryPage() {
  return (
    <div
    id="scrollable-container"
    className="flex h-full flex-col"
    style={{ backgroundColor: "var(--bg-white)", overflowY: "auto", scrollBehavior: "smooth" }}
  >
      <Category />
      <FloatingActionButton />
    </div>
  );
}
