import Recent from '@/ui/components/recent/RecentPage';
import FloatingActionButton from "@/ui/components/common/FloatingActionButton";

export default function RecentPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Recent />
      <FloatingActionButton />
    </div>
  );
}