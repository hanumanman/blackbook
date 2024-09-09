import { getAllNovels, TNovel } from '@/db/queries/selects';
import { NovelCard } from './components/NovelCard';

export default async function Home() {
  const novels = await getAllNovels();
  return (
    <main className="flex min-h-screen flex-col gap-6 items-center p-12">
      {/* Novels List Section */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {novels.map((novel: TNovel) => {
          return <NovelCard key={novel.id} novel={novel} />;
        })}
      </div>
    </main>
  );
}
