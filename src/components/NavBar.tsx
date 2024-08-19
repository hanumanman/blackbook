import Link from 'next/link';
import { ModeToggle } from './ModeToggler';

const links = [
  { name: 'Blackbook', path: '/' },
  { name: 'Upload', path: '/upload' },
];

export const NavBar = () => {
  return (
    <div className="p-8 w-full border-b border-primary flex gap-4 items-center">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.path}
          className="text-lg font-semibold"
        >
          {link.name}
        </Link>
      ))}
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
};
