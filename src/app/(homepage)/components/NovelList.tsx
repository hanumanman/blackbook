import { getAllNovels, TNovel } from '@/db/queries/selects';
import { NovelCard } from './NovelCard';
import { customFetch as fetch } from '@/lib/utils';

export async function NovelList() {
  const novels = await getAllNovels();

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {novels.map((novel: TNovel) => {
        return <NovelCard key={novel.id} novel={novel} />;
      })}
    </div>
  );
}
