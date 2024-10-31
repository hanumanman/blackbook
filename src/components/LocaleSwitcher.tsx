'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export const LocaleSwitcher = () => {
  const { refresh } = useRouter();

  function setLocale(locale: string) {
    document.cookie = `locale=${locale}`;
    refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="sr-only">Toggle locale</span>
          <span>🌐</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setLocale('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale('vi')}>Tiếng Việt</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
