import { getCurrentSession } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

export async function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/');
  }
  return <>{children}</>;
}
