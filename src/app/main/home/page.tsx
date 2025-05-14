import Main from '@/ui/components/main/MainPage';
import FloatingActionButton from '@/ui/components/common/FloatingActionButton';

export default function MainHomePage() {
  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
      }}
      className="scrollbar-hide"
    >
      <Main />
      <FloatingActionButton />
    </div>
  );
}
