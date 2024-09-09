import Link from 'next/link';
import { ModeToggle } from './ModeToggler';
import Image from 'next/image';
import LogoImage from '@/lib/images/logo.webp';
import { LocaleSwitcher } from './LocaleSwitcher';
import { AuthButton } from './AuthButton';
import { authService } from '@/auth';

export const NavBar = async () => {
  const session = await authService.auth();
  return (
    <div className="p-8 w-full border-b border-primary flex gap-4 items-center">
      <Link className="mr-8 flex gap-4 items-center" href={'/'}>
        <Image
          src={LogoImage}
          alt="logo"
          width={50}
          height={50}
          className="rounded-md"
        />
        <p className="font-bold text-2xl">Blackbook</p>
      </Link>
      <div className="ml-auto flex gap-2 items-center">
        {session && (
          <div className="flex gap-2 items-center">
            <Image
              src={session.user?.image || ''}
              alt="profile"
              width={30}
              height={30}
              className="rounded-full"
            />
            <p className="text-sm font-bold">
              {session.user?.name?.split(' ')[0]}
            </p>
          </div>
        )}
        <LocaleSwitcher />
        <ModeToggle />
        <AuthButton />
      </div>
    </div>
  );
};
