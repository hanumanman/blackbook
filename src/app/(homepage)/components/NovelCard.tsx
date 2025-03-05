import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TNovel } from '@/db/queries/selects';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export function NovelCard({ novel }: { novel: TNovel }) {
  const t = useTranslations('common');
  return (
    <Link href={`/${novel.id}`}>
      <Card className="flex flex-col h-full shadow-lg hover:scale-105 transition-all">
        <CardHeader className="p-0">
          {novel.novel_image_link && (
            <Image
              src={novel.novel_image_link}
              alt={novel.novel_name}
              className="w-full h-48 object-cover rounded-t-lg"
              width={400}
              height={600}
            />
          )}
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="text-lg font-bold mb-2">{novel.novel_name}</CardTitle>
          <p className="text-sm text-gray-500 mb-2">{novel.novel_author}</p>
          <p className="text-sm line-clamp-3">{novel.novel_description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full">{t('Start reading')}</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
