import { clearSessionCookie, getCurrentSession, invalidateSession } from '@/lib/auth/auth';
import { getEnv } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from './ui/button';

type Session = Awaited<ReturnType<typeof getCurrentSession>>['session'];

// NOTE: Next.js 15 form action must return void or Promise
async function logout(): Promise<void> {
  'use server';
  const { session } = await getCurrentSession();
  if (session === null) {
    alert('You are not logged in');
    return;
  }
  await invalidateSession(session.id);
  clearSessionCookie();
  redirect('/');
}

export const AuthButton = async ({ session }: { session: Session | null }) => {
  const t = await getTranslations('auth');
  const baseUrl = getEnv('BASE_URL');

  return session ? (
    <form action={logout}>
      <Button variant={'outline'} type="submit">
        {t('Logout')}
      </Button>
    </form>
  ) : (
    <Link href={`${baseUrl}/auth/google`}>
      <Button variant={'outline'}>{t('Login')}</Button>
    </Link>
  );
};
