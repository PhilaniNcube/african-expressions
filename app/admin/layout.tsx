import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '../../lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const reqHeaders = await headers();
  const pathname = reqHeaders.get('x-pathname') || '';
  const cookieHeader = reqHeaders.get('cookie') || '';

  console.log('AdminLayout pathname:', pathname);
  console.log('AdminLayout incoming cookies:', cookieHeader || '(none)');

  if (pathname !== '/admin/login') {
    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    console.log('AdminLayout session result:', JSON.stringify(session));

    if (!session) {
      const loginUrl = `/admin/login?redirectTo=${encodeURIComponent(pathname)}`;
      console.log('No session — redirecting to:', loginUrl);
      redirect(loginUrl);
    }
  }

  return <AdminSidebar>{children}</AdminSidebar>;
}
