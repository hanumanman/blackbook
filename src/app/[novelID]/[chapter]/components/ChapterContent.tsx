'use client';

import React, { useState } from 'react';
import { saveProgress } from '@/db/queries/inserts';
import { type TChapter } from '@/db/queries/selects';
import { TSelectUser } from '@/db/schema';
import { useTranslations } from 'next-intl';
import { IPageSettings, Utility } from './Utility';

interface Props {
  novelID: string;
  chapter: string;
  data: TChapter;
  user: TSelectUser | null;
}

export const ChapterContent = ({ data, chapter, novelID, user }: Props) => {
  const t = useTranslations('common');
  const [pageSettings, setPageSettings] = useState<IPageSettings>({
    fontSize: 16,
    lineHeight: 1.5,
  });

  const { fontSize, lineHeight } = pageSettings;

  React.useEffect(() => {
    // Need to wrap in useEffect to avoid calling saveProgress when prefetching
    if (user) {
      saveProgress(user.id, parseInt(novelID), parseInt(chapter), data.chapter_name);
    }
  }, [chapter, data.chapter_name, novelID, user, user?.id]);

  return (
    <>
      <Utility
        pageSettings={pageSettings}
        setPageSettings={setPageSettings}
        chapterNumber={Number.parseInt(chapter)}
        novelID={Number.parseInt(novelID)}
      />

      <div
        className="flex flex-col items-center gap-3 pt-3 pb-12"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: `${lineHeight}`,
        }}
      >
        <p className="font-bold pt-6">
          {t('Chapter')} {data.chapter_number}
        </p>
        <p className="font-bold pb-6">{data.chapter_name}</p>
        <p className="whitespace-pre-line">{data.chapter_content}</p>
      </div>

      <Utility
        pageSettings={pageSettings}
        setPageSettings={setPageSettings}
        chapterNumber={Number.parseInt(chapter)}
        novelID={Number.parseInt(novelID)}
      />
    </>
  );
};
