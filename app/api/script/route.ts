import { NextResponse } from 'next/server';
import { scriptRequestSchema } from '@/lib/schema';
import { buildOpenAI, generateScript } from '@/lib/openai';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = scriptRequestSchema.parse(json);
    const client = buildOpenAI();
    const script = await generateScript({
      client,
      references: parsed.references,
      targetAudience: parsed.targetAudience,
      creativeAngle: parsed.creativeAngle
    });
    return NextResponse.json({ script });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
