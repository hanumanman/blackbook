import LogoImage from '@/lib/images/logo.webp';
import Image from 'next/image';
import Link from 'next/link';
import { LocaleSwitcher } from './LocaleSwitcher';
import { ModeToggle } from './ModeToggler';

export const NavBar = async () => {
  // const session = await authService.auth();
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
      </div>
    </div>
  );
};
