import { TNovel } from '@/db/queries/selects';
import Image from 'next/image';

export function NovelCard({ novel }: { novel: TNovel }) {
  return (
    <div className="flex flex-col gap-3 border border-secondary rounded-lg p-4 w-72 aspect-[9/16]">
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
  );
}
