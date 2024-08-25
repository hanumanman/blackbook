'use client';
import { Button } from '@/components/ui/button';
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
  return (
    <div className="flex gap-4 w-full justify-center items-center">
      <Button onClick={() => handleNavigation('prev')}>Prev</Button>
      <Button onClick={() => handleNavigation('next')}>Next</Button>
    </div>
  );
};
