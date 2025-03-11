import { getChaptersList, getNovelFromId, getProgress } from '@/db/queries/selects';
import { getCurrentSession } from '@/lib/auth/auth';
import { NovelCover } from './components/NovelCover';
import { NovelInfo } from './components/NovelInfo';
import { NovelTabs } from './components/NovelTabs';
import { ReadingProgressCard } from './components/ReadingProgressCard';

interface Props {
  params: Promise<{ novelID: string }>;
}

export interface INovel {
  title: string;
  author: string;
  coverImage: string;
  synopsis: string;
  genre: string[];
  publicationDate: string;
  publisher: string;
  totalChapters: number;
  rating: number;
  reviews: number;
  pageCount: number;
  readingTime: string;
  lastRead: {
    chapter: number | null;
    title: string | null;
    // Calculate reading progress based on the last read chapter
    progress: number;
  };
}

export default async function NovelPage({ params }: Props) {
  const { novelID } = await params;
  const { user } = await getCurrentSession();
  const progress = user ? await getProgress(parseInt(novelID), user.id) : null;
  const novelData = await getNovelFromId(parseInt(novelID));
  const previewChaptersData = await getChaptersList({
    novelID: parseInt(novelID),
    limit: 5,
    offset: 0,
  });
  const previewChapters = previewChaptersData.map((chapter) => ({
    number: chapter.chapter_number,
    title: chapter.chapter_name,
  }));

  const novel: INovel = {
    title: novelData.novel_name,
    author: novelData.novel_author,
    coverImage: novelData.novel_image_link || '',
    synopsis: novelData.novel_description || '',
    genre: novelData.novel_genre.split(','),
    publicationDate: 'March 15, 2023',
    publisher: 'Black Books',
    totalChapters: novelData.chapter_count,
    rating: 4.7,
    reviews: 1283,
    pageCount: 384,
    readingTime: '8 hours',
    lastRead: {
      chapter: progress?.last_chapter_number || null,
      title: progress?.last_chapter_name || null,
      // Calculate reading progress based on the last read chapter
      progress: progress ? Math.floor((progress?.last_chapter_number / novelData.chapter_count) * 100) : 0,
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-muted/50 to-background pb-10 pt-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <NovelCover coverImage={novel.coverImage} title={novel.title} />

            <div className="flex flex-1 flex-col">
              <NovelInfo
                title={novel.title}
                author={novel.author}
                genre={novel.genre}
                rating={novel.rating}
                reviews={novel.reviews}
              />

              <ReadingProgressCard novelID={novelID} user={user} lastRead={novel.lastRead} />
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 md:px-6">
        <NovelTabs novel={novel} novelID={novelID} chapters={previewChapters} />
      </div>
    </main>
  );
}
