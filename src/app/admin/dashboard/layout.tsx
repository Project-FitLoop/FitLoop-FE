import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function decodeJwtPayload(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export const dynamic = 'force-dynamic';

export default async function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const access = cookieStore.get('access')?.value;

  if (!access) {
    redirect('/login?redirect=/dashboard');
  }

  const payload = decodeJwtPayload(access);
  const role: string | undefined = payload?.role;
  const isAdmin = role === 'ADMIN' || role === 'ROLE_ADMIN';

  if (!isAdmin) {
    redirect('/');
  }

  return <>{children}</>;
}
