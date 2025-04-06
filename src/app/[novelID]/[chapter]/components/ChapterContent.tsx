'use client';

import { saveProgress } from '@/db/queries/inserts';
import { type TChapter } from '@/db/queries/selects';
import { TSelectUser } from '@/db/schema';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Control, IPageSettings } from './Control';

interface Props {
  novelID: string;
  chapter: string;
  data: TChapter;
  user: TSelectUser | null;
}

export const ChapterContent = ({ data, chapter, novelID, user }: Props) => {
  const t = useTranslations('common');


  const { controlVisible, toggleControl, pageSettings, setPageSettings } = useControl();
  const { fontSize, lineHeight } = pageSettings;

  React.useEffect(() => {
    // Need to wrap in useEffect to avoid calling saveProgress when prefetching
    if (user) {
      saveProgress(user.id, parseInt(novelID), parseInt(chapter), data.chapter_name);
    }
  }, [chapter, data.chapter_name, novelID, user, user?.id]);



  return (
    <>
      <div className={cn("flex bg-[#e5e7eb] dark:bg-[#11131d] justify-center items-center w-full py-3 transform transition-all duration-300 ease-in-out sticky -top-20 left-0", controlVisible && "top-0 ")}>
        <Control
          pageSettings={pageSettings}
          setPageSettings={setPageSettings}
          chapterNumber={Number.parseInt(chapter)}
          novelID={Number.parseInt(novelID)}
        />
      </div>
      <div
        className="flex flex-col items-center gap-3 pt-3 pb-12"
        onClick={toggleControl}
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

      <Control
        pageSettings={pageSettings}
        setPageSettings={setPageSettings}
        chapterNumber={Number.parseInt(chapter)}
        novelID={Number.parseInt(novelID)}
      />
    </>
  );
};

const useControl = () => {
  const [showControl, setShowControl] = React.useState<boolean>(false);
  const toggleControl = () => {
    setShowControl(show => !show);
  };


  const [pageSettings, setPageSettings] = React.useState<IPageSettings>({
    fontSize: 16,
    lineHeight: 1.5,
  });


  return { controlVisible: showControl, toggleControl, pageSettings, setPageSettings };
};  
