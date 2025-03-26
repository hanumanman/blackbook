import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface ReadingProgressProps {
  novelID: string;
  user: any | null;
  lastRead: {
    chapter: number | null;
    title: string | null;
    progress: number;
  };
}

export async function ReadingProgressCard({ novelID, user, lastRead }: ReadingProgressProps) {
  const t = await getTranslations('common');
  if (!user) {
    return (
      <Card className="mt-6 border-2 border-primary/10 bg-primary/5">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Track Your Reading</h3>
            </div>
            <p className="text-muted-foreground">{t('SignInPrompt')}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href={`/${novelID}/1`}>
                <Button className="w-full sm:w-auto">{t('Start reading')}</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 border-2 border-primary/10 bg-primary/5">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{t('Continue reading')}</h3>
            <span className="text-sm text-muted-foreground">{t('progress', { percent: lastRead.progress })}</span>
          </div>
          <Progress value={lastRead.progress} className="h-2" />
          <div className="flex flex-col gap-1">
            {lastRead.chapter ? (
              <>
                <p className="text-sm text-muted-foreground">{t('You left off at')}:</p>
                <p className="font-medium">
                  {t('Chapter')} {lastRead.chapter}: {lastRead.title}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">{t("You haven't started reading yet")}</p>
            )}
          </div>
          <Link href={`/${novelID}/${lastRead?.chapter || 1}`}>
            <Button className="mt-2 w-full">
              {lastRead?.chapter ? t('Continue reading') : t('Start reading')}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
