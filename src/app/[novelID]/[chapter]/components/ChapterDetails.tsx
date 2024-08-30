import { getChapter } from '@/db/queries/selects';
import { getTranslations } from 'next-intl/server';
import { ChapterContent } from './ChapterContent';

interface Props {
  novelID: string;
  chapter: string;
}
export const ChapterDetails = async (props: Props) => {
  const { novelID, chapter } = props;
  const data = await getChapter({
    novelID: parseInt(novelID),
    chapter: parseInt(chapter),
  });
  const t = await getTranslations('common');
  return <ChapterContent novelID={novelID} chapter={chapter} data={data} />;
};
