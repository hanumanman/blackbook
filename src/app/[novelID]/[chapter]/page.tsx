import { Button } from '@/components/ui/button';
import { getChapter } from '@/db/queries/selects';
import { Navigation } from './components/Navigation';

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
    <div>
      <p> Chapter {data.chapter_number}</p>
      <Navigation
        chapterNumber={parseInt(chapter)}
        novelID={parseInt(novelID)}
      />
      <p className="text-xl font-bold">{data.chapter_name}</p>
      <p className="whitespace-pre-wrap">{data.chapter_content}</p>

      <Navigation
        chapterNumber={parseInt(chapter)}
        novelID={parseInt(novelID)}
      />
    </div>
  );
};

export default ChapterPage;
