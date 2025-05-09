import { db } from '@/db';
import { getChapter } from '@/db/queries/selects';
import { chaptersTable, TInsertChapter } from '@/db/schema';
import { normalizeVietnamese } from '@/lib/utils';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const bodySchema = z.object({
  textContent: z.string(),
  novelID: z.number(),
});

export async function GET() {
  return NextResponse.json({ message: 'Hello World!' });
}

export async function POST(request: Request) {
  //Validate request body
  const body = await request.json().catch(() => NextResponse.json({ message: 'Invalid json' }, { status: 400 }));

  const validate = bodySchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json({ message: validate.error.message }, { status: 400 });
  }

  const { textContent: text, novelID: novel_id } = validate.data;

  try {
    //Parsing text before saving to database
    const chapters = parseChapter({ text, novel_id });
    // Save to database
    chapters.forEach(async (chapter) => await InsertChapter(chapter));
    return NextResponse.json(`Seeded novel ${novel_id} successfully`);
  } catch (error: any) {
    return NextResponse.json({ message: error.message, stack: error.stack }, { status: 500 });
  }
}

async function InsertChapter(chapter: TInsertChapter) {
  if (
    await chaptersExisted({
      chapter_number: chapter.chapter_number,
      novel_id: chapter.novel_id,
    })
  ) {
    return;
  }

  return await db.insert(chaptersTable).values(chapter);
}

function parseChapter({ text, novel_id }: { text: string; novel_id: number }) {
  const chapterRegex = /(?:CHƯƠNG|Chương) (\d+):\s*([^\n]+)/g;
  const chapters = [];
  let match;
  let chapterNumber = 0;
  while ((match = chapterRegex.exec(text)) !== null) {
    chapterNumber += 1;
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
      novel_id,
      chapter_name_normalized: normalizeVietnamese(chapterTitle),
    });

    // Reset the lastIndex to current endIndex for the next iteration
    chapterRegex.lastIndex = endIndex;
  }
  return chapters;
}

async function chaptersExisted({ chapter_number, novel_id }: { chapter_number: number; novel_id: number }) {
  const res = await getChapter({ novelID: novel_id, chapter_number });
  if (res) {
    return true;
  }
  return false;
}
