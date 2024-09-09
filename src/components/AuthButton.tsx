import { login, logout } from '@/actions/authActions';
import { Session } from 'next-auth';
import { Button } from './ui/button';
import { getTranslations } from 'next-intl/server';

export const AuthButton = async ({ session }: { session: Session | null }) => {
  const t = await getTranslations('auth');
  return session ? (
    <form action={logout}>
      <Button type="submit">{t('Logout')}</Button>
    </form>
  ) : (
    <form action={login}>
      <Button type="submit">{t('Login')}</Button>
    </form>
  );
};
