import { Suspense } from 'react';
import { ChapterContent } from './components/ChapterContent';
import { Navigation } from './components/Navigation';
import { Spinner } from '@/components/Spinner';

const ChapterPage = async ({
  params,
}: {
  params: { novelID: string; chapter: string };
}) => {
  const { novelID, chapter } = params;

  return (
    <div className="min-h-[100vh] p-12 flex flex-col justify-between text-lg">
      <Navigation
        chapterNumber={parseInt(chapter)}
        novelID={parseInt(novelID)}
      />
      <Suspense fallback={<Spinner />}>
        <ChapterContent novelID={novelID} chapter={chapter} />
      </Suspense>

      <Navigation
        chapterNumber={parseInt(chapter)}
        novelID={parseInt(novelID)}
      />
    </div>
  );
};

export default ChapterPage;
