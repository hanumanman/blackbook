import { db } from '@/db';
import { chaptersTable, TInsertChapter } from '@/db/schema';

//TODO: Get novel_id from request
const novel_id = 1;

async function InsertChapter(chapter: TInsertChapter) {
  await db.insert(chaptersTable).values(chapter);
}

export async function POST(request: Request) {
  const res: { textContent: string } = await request.json();
  const { textContent: text } = res;

  //parsing text before saving to database
  const chapters = [];
  const chapterRegex = /(?:CHƯƠNG|Chương) (\d+):\s*([^\n]+)/g;
  let match;
  while ((match = chapterRegex.exec(text)) !== null) {
    const chapterNumber = parseInt(match[1], 10);
    const chapterTitle = match[2].trim();
    const startIndex = match.index + match[0].length;
    const endIndex = chapterRegex.lastIndex;

    // Find the next chapter start or the end of the string
    const nextMatch = chapterRegex.exec(text);
    const chapterContent = text
      .slice(startIndex, nextMatch ? nextMatch.index : text.length)
      .trim();

    chapters.push({
      chapter_number: chapterNumber,
      chapter_name: chapterTitle,
      chapter_content: chapterContent,
      novel_id,
    });

    // Reset the lastIndex to current endIndex for the next iteration
    chapterRegex.lastIndex = endIndex;
  }

  // Save to database
  chapters.forEach(async (chapter) => await InsertChapter(chapter));

  return Response.json(`Seeded novel ${novel_id} successfully`);
}
