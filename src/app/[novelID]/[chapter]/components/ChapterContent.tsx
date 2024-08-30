'use client';
import { TChapter } from '@/db/queries/selects';
import { useTranslations } from 'next-intl';
import { Utility } from './Utility';
import { useState } from 'react';

interface Props {
  novelID: string;
  chapter: string;
  data: TChapter;
}

export const ChapterContent = ({ chapter, data, novelID }: Props) => {
  const t = useTranslations('common');
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  return (
    <>
      <Utility
        lineHeight={lineHeight}
        setLineHeight={setLineHeight}
        fontSize={fontSize}
        setFontSize={setFontSize}
        chapterNumber={parseInt(chapter)}
        novelID={parseInt(novelID)}
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
        lineHeight={lineHeight}
        setLineHeight={setLineHeight}
        fontSize={fontSize}
        setFontSize={setFontSize}
        chapterNumber={parseInt(chapter)}
        novelID={parseInt(novelID)}
      />
    </>
  );
};
