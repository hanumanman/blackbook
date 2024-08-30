import { Spinner } from '@/components/Spinner';
import { Suspense } from 'react';
import { ChapterDetails } from './components/ChapterDetails';

const ChapterPage = async ({
  params,
}: {
  params: { novelID: string; chapter: string };
}) => {
  const { novelID, chapter } = params;

  return (
    <div className="min-h-[100vh] p-6 md:p-12 lg:p-16 flex flex-col justify-between text-lg">
      <Suspense fallback={<Spinner />}>
        <ChapterDetails novelID={novelID} chapter={chapter} />
      </Suspense>
    </div>
  );
};

export default ChapterPage;
