import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '../../lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const reqHeaders = await headers();
  const pathname = reqHeaders.get('x-pathname') || '';

  console.log('AdminLayout pathname check:', pathname);

  if (pathname !== '/admin/login') {
    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    console.log('AdminLayout session status:', session ? 'Authenticated' : 'Unauthenticated');

    if (!session) {
      const loginUrl = `/admin/login?redirectTo=${encodeURIComponent(pathname)}`;
      console.log('Redirecting unauthenticated user to:', loginUrl);
      redirect(loginUrl);
    }
  }

  return <>{children}</>;
}
