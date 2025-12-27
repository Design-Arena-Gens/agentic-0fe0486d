import { NextResponse } from 'next/server';
import { uploadRequestSchema } from '@/lib/schema';
import { uploadShortToYouTube } from '@/lib/youtube';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = uploadRequestSchema.parse(json);
    const upload = await uploadShortToYouTube(parsed);
    return NextResponse.json({ upload });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
