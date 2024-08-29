import { Suspense } from 'react';
import { NovelList } from './components/NovelList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-6 items-center p-12">
      {/* Novels List Section */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full h-96">
            <p className="text-2xl font-bold ">Loading...</p>
          </div>
        }
      >
        <NovelList />
      </Suspense>
    </main>
  );
}
