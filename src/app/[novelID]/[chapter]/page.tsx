import { getChapter } from '@/db/queries/selects';
import { ChapterContent } from './components/ChapterContent';

const ChapterPage = async ({ params }: { params: { novelID: string; chapter: string } }) => {
  const { novelID, chapter } = params;

  const data = await getChapter({
    novelID: Number.parseInt(novelID),
    chapter: Number.parseInt(chapter),
  });

  if (!data) {
    return <div className="grid place-items-center w-screen font-bold text-lg pt-12">Chapter not found hehe</div>;
  }

  return (
    <div className="min-h-[100vh] p-6 md:p-12 lg:p-16 flex flex-col justify-between text-lg">
      <ChapterContent data={data} novelID={novelID} chapter={chapter} />
    </div>
  );
};

export default ChapterPage;
