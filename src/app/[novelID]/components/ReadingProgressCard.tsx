import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';
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

export function ReadingProgressCard({ novelID, user, lastRead }: ReadingProgressProps) {
  if (!user) {
    return (
      <Card className="mt-6 border-2 border-primary/10 bg-primary/5">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Track Your Reading</h3>
            </div>
            <p className="text-muted-foreground">
              Sign in to keep track of your reading progress, bookmark favorite chapters, and sync across all your
              devices.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href={`/${novelID}/1`}>
                <Button className="w-full sm:w-auto">Start Reading</Button>
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
            <h3 className="text-lg font-semibold">Continue Reading</h3>
            <span className="text-sm text-muted-foreground">{lastRead.progress}% complete</span>
          </div>
          <Progress value={lastRead.progress} className="h-2" />
          <div className="flex flex-col gap-1">
            {lastRead.chapter ? (
              <>
                <p className="text-sm text-muted-foreground">You left off at:</p>
                <p className="font-medium">
                  Chapter {lastRead.chapter}: {lastRead.title}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">You haven&apos;t started reading yet</p>
            )}
          </div>
          <Link href={`/${novelID}/${lastRead?.chapter || 1}`}>
            <Button className="mt-2 w-full">
              {lastRead?.chapter ? 'Continue' : 'Start'} Reading
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

