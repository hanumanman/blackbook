import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { INovel } from '../page';
import { ChaptersTab } from './ChaptersTab';
import { DetailsTab } from './DetailsTab';
import { SynopsisTab } from './SynopsisTab';

interface Chapter {
  number: number;
  title: string;
}

interface NovelTabsProps {
  novel: INovel;
  chapters: Chapter[];
  novelID: string;
}

export function NovelTabs({ novel, chapters, novelID }: NovelTabsProps) {
  return (
    <Tabs defaultValue="synopsis" className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-3 md:w-auto">
        <TabsTrigger value="synopsis">Synopsis</TabsTrigger>
        <TabsTrigger value="chapters">Chapters</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
      </TabsList>
      <TabsContent value="synopsis" className="mt-0">
        <SynopsisTab synopsis={novel.synopsis} novelID={novelID} />
      </TabsContent>
      <TabsContent value="chapters" className="mt-0">
        <ChaptersTab
          chapters={chapters}
          totalChapters={novel.totalChapters}
          currentChapter={novel.lastRead.chapter}
          novelID={novelID}
        />
      </TabsContent>
      <TabsContent value="details" className="mt-0">
        <DetailsTab novel={novel} />
      </TabsContent>
    </Tabs>
  );
}
