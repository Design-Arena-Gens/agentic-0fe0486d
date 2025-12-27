import { NextResponse } from 'next/server';
import { fetchTrendingShorts } from '@/lib/youtube';
import { trendRequestSchema } from '@/lib/schema';
import { requiredEnv } from '@/lib/env';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = trendRequestSchema.parse({
      regionCode: searchParams.get('regionCode') ?? undefined,
      maxResults: searchParams.get('maxResults')
        ? Number(searchParams.get('maxResults'))
        : undefined,
      topic: searchParams.get('topic') ?? undefined
    });

    const apiKey = requiredEnv('YOUTUBE_API_KEY');
    const trending = await fetchTrendingShorts({
      apiKey,
      regionCode: parsed.regionCode,
      maxResults: parsed.maxResults,
      topic: parsed.topic
    });
    return NextResponse.json({ items: trending });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
