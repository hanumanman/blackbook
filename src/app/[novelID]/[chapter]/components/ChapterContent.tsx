'use client';
import { getChapter, TChapter } from '@/db/queries/selects';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { IPageSettings, TReadMode, Utility } from './Utility';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Props {
  novelID: string;
  chapter: string;
  data: TChapter;
}

export const ChapterContent = ({ data, chapter, novelID }: Props) => {
  const t = useTranslations('common');

  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [readMode, setReadMode] = useState<TReadMode>('single');

  const pageSettings: IPageSettings = {
    fontSize,
    setFontSize,
    lineHeight,
    setLineHeight,
    readMode,
    setReadMode,
  };

  function ChapterPage({ data }: { data: TChapter }) {
    return (
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
    );
  }

  function SinglePage() {
    return (
      <>
        <Utility
          pageSettings={pageSettings}
          chapterNumber={parseInt(chapter)}
          novelID={parseInt(novelID)}
        />

        <ChapterPage data={data} />

        <Utility
          pageSettings={pageSettings}
          chapterNumber={parseInt(chapter)}
          novelID={parseInt(novelID)}
        />
      </>
    );
  }

  function InfinitePage() {
    const [chapterContents, setChapterContents] = useState<TChapter[]>([data]);
    const [currentChapter, setCurrentChapter] = useState<number>(
      parseInt(chapter)
    );

    async function fetchNextChapter() {
      const nextChapterData = await getChapter({
        novelID: parseInt(novelID),
        chapter: currentChapter + 1,
      });
      if (nextChapterData) {
        setCurrentChapter((prev) => prev + 1);
        setChapterContents((prev) => [...prev, nextChapterData]);
      }
    }

    return (
      <div className="relative">
        <div className="sticky top-0 bg-background pb-4">
          <div className="w-full flex justify-center mb-3">
            <Button onClick={() => fetchNextChapter()}>Fetch</Button>
          </div>
          <Utility
            pageSettings={pageSettings}
            chapterNumber={parseInt(chapter)}
            novelID={parseInt(novelID)}
          />
        </div>
        <div className="">
          {chapterContents.map((chapter, index) => (
            <div key={chapter.chapter_number} className="flex flex-col gap-4">
              <ChapterPage data={chapter} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return readMode === 'single' ? <SinglePage /> : <InfinitePage />;
};
