'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Triangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const Navigation = ({
  chapterNumber,
  novelID,
}: {
  chapterNumber: number;
  novelID: number;
}) => {
  const [input, setInput] = useState('');
  const { push } = useRouter();
  function handleNavigation(direction: 'prev' | 'next') {
    const newChapter =
      direction === 'prev' ? chapterNumber - 1 : chapterNumber + 1;
    push(`/${novelID}/${newChapter}`);
  }

  const t = useTranslations('common');
  return (
    <div className="flex gap-4 w-full justify-center items-center">
      <Button onClick={() => handleNavigation('prev')}>{t('Prev')}</Button>
      <Input
        onChange={(e) => setInput(e.target.value)}
        className="w-20 border-2"
        type="number"
        value={input}
      />
      <Button onClick={() => push(`/${novelID}/${input}`)}>
        <Triangle className="rotate-90" />
      </Button>
      <Button onClick={() => handleNavigation('next')}>{t('Next')}</Button>
    </div>
  );
};
