import { getChapter } from '@/db/queries/selects';
import { Navigation } from './components/Navigation';
import { Suspense } from 'react';

const ChapterPage = async ({
  params,
}: {
  params: { novelID: string; chapter: string };
}) => {
  const { novelID, chapter } = params;
  const chapterData = await getChapter({
    novelID: parseInt(novelID),
    chapter: parseInt(chapter),
  });
  const data = chapterData[0];

  return (
    <div className="min-h-[100vh] px-12 py-16">
      <Navigation
        chapterNumber={parseInt(chapter)}
        novelID={parseInt(novelID)}
      />
      <Suspense
        fallback={
          <div className="w-full h-96 flex justify-center items-center">
            Loading...
          </div>
        }
      >
        <p> Chapter {data.chapter_number}</p>
        <p className="text-xl font-bold">{data.chapter_name}</p>
        <p className="whitespace-pre-wrap">{data.chapter_content}</p>
      </Suspense>

      <Navigation
        chapterNumber={parseInt(chapter)}
        novelID={parseInt(novelID)}
      />
    </div>
  );
};

export default ChapterPage;
