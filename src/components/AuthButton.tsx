import { getTranslations } from 'next-intl/server';
import { Button } from './ui/button';

// TODO: implement
type Session = {
  user: {
    name: string;
  };
};

export const AuthButton = async ({ session }: { session: Session | null }) => {
  // TODO: implement
  function login() {
    alert('Login');
  }
  function logout() {
    alert('Logout');
  }

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
