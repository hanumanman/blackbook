import { login, logout } from '@/actions/authActions';
import { getTranslations } from 'next-intl/server';
import { Button } from './ui/button';

// TODO  fix any
export const AuthButton = async ({ session }: { session: any | null }) => {
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
