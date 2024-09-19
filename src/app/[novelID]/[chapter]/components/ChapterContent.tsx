'use client';
import type { TChapter } from '@/db/queries/selects';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { type IPageSettings, Utility } from './Utility';

interface Props {
  novelID: string;
  chapter: string;
  data: TChapter;
}

export const ChapterContent = ({ data, chapter, novelID }: Props) => {
  const t = useTranslations('common');

  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);

  const pageSettings: IPageSettings = {
    fontSize,
    setFontSize,
    lineHeight,
    setLineHeight,
  };

  return (
    <>
      <Utility
        pageSettings={pageSettings}
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
        chapterNumber={Number.parseInt(chapter)}
        novelID={Number.parseInt(novelID)}
      />
    </>
  );
};
