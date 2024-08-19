import { ModeToggle } from './ModeToggler';

export const NavBar = () => {
  return (
    <div className="p-8 w-full border-b border-primary flex gap-4 items-center">
      <p className="font-bold text-xl">Blackbook</p>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
};
