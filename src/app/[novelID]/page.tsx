import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getNovelFromId, getProgress } from '@/db/queries/selects';
import { getCurrentSession } from '@/lib/auth/auth';
import { ChevronRight, Heart, Share2, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: Promise<{ novelID: string }>;
}

export default async function NovelPage({ params }: Props) {
  const { novelID } = await params;
  const { user } = await getCurrentSession();
  const progress = user ? await getProgress(parseInt(novelID), user.id) : null;
  const novelData = await getNovelFromId(parseInt(novelID));
  const novel = {
    title: novelData.novel_name,
    author: novelData.novel_author,
    coverImage: novelData.novel_image_link,
    synopsis: novelData.novel_description,
    genre: novelData.novel_genre.split(','),
    publicationDate: 'March 15, 2023',
    publisher: 'Black Books',
    totalChapters: novelData.chapter_count,
    rating: 4.7,
    reviews: 1283,
    pageCount: 384,
    readingTime: '8 hours',
    lastRead: {
      chapter: progress?.last_chapter_number,
      title: progress?.last_chapter_name,
      // Calculate reading progress based on the last read chapter
      progress: progress && Math.floor((progress?.last_chapter_number / novelData.chapter_count) * 100),
    },
  };

  // Sample chapters for the table of contents
  const chapters = [
    { number: 1, title: 'The First Echo' },
    { number: 2, title: 'Whispers in the Dark' },
    { number: 3, title: 'The Disappearance' },
    { number: 4, title: 'Fragments' },
    { number: 5, title: 'The Memory Market' },
    // More chapters would be listed here
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero section with cover and basic info */}
      <div className="bg-gradient-to-b from-muted/50 to-background pb-10 pt-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            {/* Cover image */}
            <div className="flex-shrink-0">
              <div className="relative h-[400px] w-[250px] overflow-hidden rounded-lg shadow-lg md:h-[500px] md:w-[320px]">
                <Image
                  src={novel.coverImage || '/placeholder.svg'}
                  alt={`Cover of ${novel.title}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <Button variant="outline" size="sm" className="flex gap-1">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only">Favorite</span>
                </Button>
                <Button variant="outline" size="sm" className="flex gap-1">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only">Share</span>
                </Button>
              </div>
            </div>

            {/* Novel details */}
            <div className="flex flex-1 flex-col">
              <div className="mb-2 flex flex-wrap gap-2">
                {novel.genre.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{novel.title}</h1>
              <p className="text-lg text-muted-foreground">
                by{' '}
                <Link href="#" className="font-medium hover:underline">
                  {novel.author}
                </Link>
              </p>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(novel.rating) ? 'fill-primary text-primary' : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{novel.rating}</span>
                <span className="text-muted-foreground">({novel.reviews.toLocaleString()} reviews)</span>
              </div>

              {!user ? (
                <Card className="mt-6 border-2 border-primary/10 bg-primary/5">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Track Your Reading</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Sign in to keep track of your reading progress, bookmark favorite chapters, and sync across all
                        your devices.
                      </p>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Button className="w-full sm:w-auto">Start Reading</Button>
                        <Button variant="outline" className="w-full sm:w-auto">
                          Sign In
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mt-6 border-2 border-primary/10 bg-primary/5">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Continue Reading</h3>
                        <span className="text-sm text-muted-foreground">{novel.lastRead.progress}% complete</span>
                      </div>
                      <Progress value={novel.lastRead.progress} className="h-2" />
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-muted-foreground">You left off at:</p>
                        <p className="font-medium">
                          Chapter {novel.lastRead.chapter}: {novel.lastRead.title}
                        </p>
                      </div>
                      <Link href={`/${novelID}/${progress?.last_chapter_number}`}>
                        <Button className="mt-2 w-full">
                          Continue Reading
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for synopsis, chapters, etc. */}
      <div className="container px-4 py-8 md:px-6">
        <Tabs defaultValue="synopsis" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="synopsis">Synopsis</TabsTrigger>
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="synopsis" className="mt-0">
            <div className="prose max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed">{novel.synopsis}</p>
              <Link className="mt-6 flex justify-center" href={`/${novelID}/1`}>
                <Button size="lg">Start Reading</Button>
              </Link>
            </div>
          </TabsContent>
          <TabsContent value="chapters" className="mt-0">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Table of Contents</h2>
              <p className="text-muted-foreground">{novel.totalChapters} chapters in total</p>
              <Separator />
              <div className="space-y-2">
                {chapters.map((chapter) => (
                  <Link
                    key={chapter.number}
                    href="#"
                    className="flex items-center justify-between rounded-md p-3 hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                        {chapter.number}
                      </span>
                      <span className={chapter.number === novel.lastRead.chapter ? 'font-medium text-primary' : ''}>
                        {chapter.title}
                      </span>
                    </div>
                    {chapter.number === novel.lastRead.chapter && (
                      <Badge variant="outline" className="ml-2">
                        Current
                      </Badge>
                    )}
                  </Link>
                ))}
                {novel.totalChapters > chapters.length && (
                  <Button variant="ghost" className="w-full">
                    View All Chapters
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-0">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Book Details</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Title</p>
                    <p>{novel.title}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Author</p>
                    <p>{novel.author}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Publisher</p>
                    <p>{novel.publisher}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Publication Date</p>
                    <p>{novel.publicationDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Pages</p>
                    <p>{novel.pageCount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Chapters</p>
                    <p>{novel.totalChapters}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Genres</p>
                    <p>{novel.genre.join(', ')}</p>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h2 className="text-2xl font-bold">About the Author</h2>
                <p className="mt-4 text-muted-foreground">
                  Eleanor Blackwood is an award-winning author known for her immersive science fiction worlds and
                  complex character development. The Silent Echo is her fifth novel and the first in a planned trilogy.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
