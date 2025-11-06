import DashBoardForm from '@/ui/components/dashboard/dashboard';

export default function DashBoardPage() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
      }}
    >
      <DashBoardForm />
    </div>
  );
}
