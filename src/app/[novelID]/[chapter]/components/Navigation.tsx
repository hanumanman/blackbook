'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export const Navigation = ({
  chapterNumber,
  novelID,
}: {
  chapterNumber: number;
  novelID: number;
}) => {
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
      <Input className="w-16 border-2" />
      <Button onClick={() => handleNavigation('next')}>{t('Next')}</Button>
    </div>
  );
};
