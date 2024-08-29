import { getChapter } from '@/db/queries/selects';
import { getTranslations } from 'next-intl/server';

interface Props {
  novelID: string;
  chapter: string;
}
export const ChapterContent = async (props: Props) => {
  const { novelID, chapter } = props;
  const chapterData = await getChapter({
    novelID: parseInt(novelID),
    chapter: parseInt(chapter),
  });
  const data = chapterData[0];
  const t = await getTranslations('common');
  return (
    <div className="flex flex-col items-center gap-3 pt-3">
      <p className="text-xl font-bold">
        {t('Chapter')} {data.chapter_number}
      </p>
      <p className="text-xl font-bold">{data.chapter_name}</p>
      <p className="whitespace-pre-wrap">{data.chapter_content}</p>
    </div>
  );
};
