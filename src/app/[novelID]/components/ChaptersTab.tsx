import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface Chapter {
  number: number;
  title: string;
}

interface ChaptersTabProps {
  chapters: Chapter[];
  totalChapters: number;
  currentChapter: number | null;
  novelID: string;
}

export async function ChaptersTab({ chapters, totalChapters, currentChapter, novelID }: ChaptersTabProps) {
  const t = await getTranslations('common');
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('Table of Contents')}</h2>
      <p className="text-muted-foreground">{t('Chapters number', { chapterNumber: totalChapters })}</p>
      <Separator />
      <div className="space-y-2">
        {chapters.map((chapter) => (
          <Link
            key={chapter.number}
            href={`/${novelID}/${chapter.number}`}
            className="flex items-center justify-between rounded-md p-3 hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                {chapter.number}
              </span>
              <span className={chapter.number === currentChapter ? 'font-medium text-primary' : ''}>
                {chapter.title}
              </span>
            </div>
            {chapter.number === currentChapter && (
              <Badge variant="outline" className="ml-2">
                Current
              </Badge>
            )}
          </Link>
        ))}
        {totalChapters > chapters.length && (
          <Button variant="ghost" className="w-full">
            {t('View all chapters')}
          </Button>
        )}
      </div>
    </div>
  );
}
