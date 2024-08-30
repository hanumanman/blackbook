import Link from 'next/link';
import { ModeToggle } from './ModeToggler';
import Image from 'next/image';
import LogoImage from '@/lib/images/logo.webp';
import { LocaleSwitcher } from './LocaleSwitcher';

const links = [{ name: 'Upload', path: '/upload' }];

export const NavBar = () => {
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
      {/* {links.map((link) => (
        <Link
          key={link.name}
          href={link.path}
          className="text-lg font-semibold"
        >
          {link.name}
        </Link>
      ))} */}
      <div className="ml-auto flex gap-2">
        <LocaleSwitcher />
        <ModeToggle />
      </div>
    </div>
  );
};
