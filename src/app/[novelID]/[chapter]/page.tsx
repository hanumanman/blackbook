import { getChapter, getNovelFromId } from '@/db/queries/selects';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ChapterContent } from './components/ChapterContent';

interface Props {
  params: Promise<{ novelID: string; chapter: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { chapter, novelID } = await params;
  const novel = await getNovelFromId(parseInt(novelID));

  const t = await getTranslations('common');
  return {
    title: `${t('Chapter')} ${chapter} - ${novel.novel_name}`,
  };
}

const ChapterPage = async (props: Props) => {
  const params = await props.params;
  const { novelID, chapter } = params;

  const data = await getChapter({
    novelID: Number.parseInt(novelID),
    chapter_number: Number.parseInt(chapter),
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
