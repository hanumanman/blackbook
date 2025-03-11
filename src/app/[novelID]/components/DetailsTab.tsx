import { Separator } from '@/components/ui/separator';

interface NovelDetails {
  title: string;
  author: string;
  publisher: string;
  publicationDate: string;
  pageCount: number;
  totalChapters: number;
  genre: string[];
}

export function DetailsTab({ novel }: { novel: NovelDetails }) {
  return (
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
        <p className="mt-4 text-muted-foreground">{novel.author}</p>
      </div>
    </div>
  );
}