import { TNovel } from '@/db/queries/selects';
import Image from 'next/image';
import Link from 'next/link';

export function NovelCard({ novel }: { novel: TNovel }) {
  return (
    <Link href={`/${novel.id}/1`}>
      {/* //TODO: fix bg on hover */}
      <div className="flex flex-col gap-3 border border-primary rounded-lg p-4 w-72 aspect-[9/16] bg-card hover:bg-card/85 hover:-translate-y-1 transition-all">
        <p className="text-2xl font-bold h-16">{novel.novel_name}</p>
        {novel.novel_image_link && (
          <Image
            src={novel.novel_image_link}
            width={400}
            height={600}
            alt={novel.novel_name}
          />
        )}
        <p className="font-bold">{novel.novel_author}</p>
        <p className="line-clamp-4">{novel.novel_description}</p>
      </div>
    </Link>
  );
}
