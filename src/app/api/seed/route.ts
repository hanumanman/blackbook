import { db } from '@/db';
import { chaptersTable, TInsertChapter } from '@/db/schema';
import { normalizeVietnamese } from '@/lib/utils';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const bodySchema = z.object({
  textContent: z.string(),
  novelID: z.number(),
});

export async function POST(request: Request) {
  //Validate request body
  const res: { textContent: string; novelID: number } = await request
    .json()
    .catch(() => NextResponse.json({ message: 'Invalid json' }, { status: 400 }));

  const validate = bodySchema.safeParse(res);

  if (!validate.success) {
    return NextResponse.json({ message: validate.error.message }, { status: 400 });
  }

  const { textContent: text, novelID: novel_id } = validate.data;

  //Parsing text before saving to database
  const chapters = parseChapter(text);

  // Save to database
  try {
    chapters.forEach(async (chapter) => await InsertChapter(chapter));
  } catch (error: any) {
    return NextResponse.json({ message: error.message, stack: error.stack }, { status: 500 });
  }

  return Response.json(`Seeded novel ${novel_id} successfully`);
}

async function InsertChapter(chapter: TInsertChapter) {
  await db.insert(chaptersTable).values(chapter);
}

function parseChapter(text: string) {
  const chapterRegex = /(?:CHƯƠNG|Chương) (\d+):\s*([^\n]+)/g;
  const chapters = [];
  let match;
  while ((match = chapterRegex.exec(text)) !== null) {
    const chapterNumber = parseInt(match[1], 10);
    const chapterTitle = match[2].trim();
    const startIndex = match.index + match[0].length;
    const endIndex = chapterRegex.lastIndex;

    // Find the next chapter start or the end of the string
    const nextMatch = chapterRegex.exec(text);
    const chapterContent = text.slice(startIndex, nextMatch ? nextMatch.index : text.length).trim();

    chapters.push({
      chapter_number: chapterNumber,
      chapter_name: chapterTitle,
      chapter_content: chapterContent,
      novel_id: 1,
      chapter_name_normalized: normalizeVietnamese(chapterTitle),
    });

    // Reset the lastIndex to current endIndex for the next iteration
    chapterRegex.lastIndex = endIndex;
  }
  return chapters;
}
