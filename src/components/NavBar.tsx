import LogoImage from '@/lib/images/logo.webp';
import { getEnv } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { LocaleSwitcher } from './LocaleSwitcher';
import { ModeToggle } from './ModeToggler';
import { Button } from './ui/button';

export const NavBar = async () => {
  // const session = await authService.auth();
  const baseUrl = getEnv('BASE_URL');
  return (
    <div className="p-8 w-full bg-background shadow flex gap-4 items-center">
      <Link className="md:mr-8 flex gap-4 items-center" href={'/'}>
        <Image src={LogoImage} alt="logo" width={50} height={50} className="rounded-md" />
        <p className="font-bold text-2xl hidden md:block">Blackbook</p>
      </Link>
      <div className="ml-auto flex gap-2 items-center">
        {/* {session && ( */}
        {/*   <div className="flex gap-2 items-center"> */}
        {/*     <Image src={session.user?.image || ''} alt="profile" width={30} height={30} className="rounded-full" /> */}
        {/*   </div> */}
        {/* )} */}
        <LocaleSwitcher />
        <ModeToggle />
        {/* <AuthButton session={session} /> */}
        <Button asChild>
          <Link href={`${baseUrl}/auth/google`}>Login</Link>
        </Button>
      </div>
    </div>
  );
};
