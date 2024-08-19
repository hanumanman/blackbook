import { getAllNovels } from '@/db/queries/selects';
import Image from 'next/image';

export default async function Home() {
  const novels = await getAllNovels();
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="text-3xl font-bold">Home Page</h1>
      {novels.map((novel) => {
        const {
          id,
          novel_author: author,
          novel_description: desc,
          novel_genre: genre,
          novel_image_link: image,
          novel_name: name,
        } = novel;
        return (
          <div key={id} className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-lg">{author}</p>
            <p className="text-lg">{genre}</p>
            <p className="text-lg">{desc}</p>
            {image && (
              <Image
                className="w-1/4 h-1/4"
                src={image}
                alt={name}
                width={500}
                height={500}
              />
            )}
          </div>
        );
      })}
    </main>
  );
}
