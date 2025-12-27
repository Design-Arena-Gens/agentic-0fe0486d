import { NextResponse } from 'next/server';
import { videoRequestSchema } from '@/lib/schema';
import { generateVideoAsset } from '@/lib/replicate';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = videoRequestSchema.parse(json);
    const asset = await generateVideoAsset(parsed);
    return NextResponse.json({ asset });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
