import { Button } from '@/components/ui/button';
import { Heart, Share2 } from 'lucide-react';
import Image from 'next/image';

interface NovelCoverProps {
  coverImage: string;
  title: string;
}

export function NovelCover({ coverImage, title }: NovelCoverProps) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center">
      <div className="relative h-[400px] w-[250px] overflow-hidden rounded-lg shadow-lg md:h-[500px] md:w-[320px]">
        <Image
          src={coverImage || '/placeholder.svg'}
          alt={`Cover of ${title}`}
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
  );
}