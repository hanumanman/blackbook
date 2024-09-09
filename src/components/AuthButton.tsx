import { login, logout } from '@/actions/authActions';
import { authService } from '@/auth';
import { Button } from './ui/button';

export const AuthButton = async () => {
  const session = await authService.auth();
  return (
    <div>
      {session ? (
        <form action={logout}>
          <Button type="submit">Logout</Button>
        </form>
      ) : (
        <form action={login}>
          <Button type="submit">Login</Button>
        </form>
      )}
    </div>
  );
};
