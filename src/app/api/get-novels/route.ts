import { getAllNovels } from '@/db/queries/selects';

export async function GET() {
  const res = await getAllNovels();
  return Response.json(res);
}
