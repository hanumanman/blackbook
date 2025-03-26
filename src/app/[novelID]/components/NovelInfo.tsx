import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface NovelInfoProps {
  title: string;
  author: string;
  genre: string[];
  rating: number;
  reviews: number;
}

export async function NovelInfo({ title, author, genre, rating, reviews }: NovelInfoProps) {
  const t = await getTranslations('common');
  return (
    <>
      <div className="mb-2 flex flex-wrap gap-2">
        {genre.map((genreItem) => (
          <Badge key={genreItem} variant="secondary">
            {genreItem}
          </Badge>
        ))}
      </div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{title}</h1>
      <p className="text-lg text-muted-foreground">
        by{' '}
        <Link href="#" className="font-medium hover:underline">
          {author}
        </Link>
      </p>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < Math.floor(rating) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
            />
          ))}
        </div>
        <span className="font-medium">{rating}</span>
        <span className="text-muted-foreground">
          ({reviews.toLocaleString()} {t('reviews')})
        </span>
      </div>
    </>
  );
}

