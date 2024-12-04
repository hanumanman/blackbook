import { useEffect, useState } from 'react';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { SheetTitle } from '@/components/ui/sheet';
import { getTableOfContents, TChapter } from '@/db/queries/selects';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

//This is a client component
export const TableOfContents = ({ novelID }: { novelID: number }) => {
  const t = useTranslations('utility');
  const [chapters, setChapters] = useState<TChapter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [paginationOffset, setPaginationOffset] = useState<number>(0);

  useEffect(() => {
    const getChapters = async (offset: number) => {
      setLoading(true);
      const chapters = await getTableOfContents({
        limit: 20,
        novelID,
        offset: offset,
      });
      if (chapters) setChapters(chapters);
      setLoading(false);
    };

    getChapters(paginationOffset);
  }, [novelID, paginationOffset]);

  return (
    <>
      <SheetTitle className="font-bold text-lg">{t('Select chapter')}</SheetTitle>
      <form
        className="flex flex-col gap-4"
        action={async (formData) => {
          setPaginationOffset(0);
          const searchTerm = formData.get('searchTerm')?.toString() || '';
          const chapters = await getTableOfContents({
            limit: 20,
            novelID,
            offset: paginationOffset,
            searchTerm,
          });
          if (chapters) setChapters(chapters);
        }}
      >
        <Input name="searchTerm" />
        <SubmitButton />
      </form>

      {loading ? (
        <Spinner />
      ) : (
        <div>
          {chapters.map((chapter) => (
            <div key={chapter.id}>
              <Link href={`/${novelID}/${chapter.chapter_number}`}>
                <Button variant="ghost" className="w-full justify-start">
                  <p className="line-clamp-1 w-full text-start">
                    Chapter {chapter.chapter_number}: {chapter.chapter_name}
                  </p>
                </Button>
              </Link>
            </div>
          ))}

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem
                onClick={() =>
                  setPaginationOffset((prev) => {
                    if (prev === 0) return prev;
                    return prev - 20;
                  })
                }
              >
                <PaginationPrevious href="#" />
              </PaginationItem>

              <PaginationItem
                onClick={() => {
                  setPaginationOffset((prev) => {
                    return prev + 20;
                  });
                }}
              >
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

function SubmitButton() {
  const t = useTranslations('utility');
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-label="Go to selected chapter" disabled={pending}>
      {pending ? <LoaderCircle className="animate-spin" /> : t('Go to chapter')}
    </Button>
  );
}
