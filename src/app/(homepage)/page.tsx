import { Suspense } from 'react';
import { NovelList } from './components/NovelList';
import { Spinner } from '@/components/Spinner';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-6 items-center p-12">
      {/* Novels List Section */}
      <Suspense fallback={<Spinner />}>
        <NovelList />
      </Suspense>
    </main>
  );
}
