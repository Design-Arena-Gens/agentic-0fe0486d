import { NextResponse } from 'next/server';
import { agentRequestSchema } from '@/lib/schema';
import { runAgentWorkflow } from '@/lib/agent';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = agentRequestSchema.parse(json);
    const result = await runAgentWorkflow({
      regionCode: parsed.regionCode,
      targetAudience: parsed.targetAudience,
      creativeAngle: parsed.creativeAngle,
      topic: parsed.topic,
      runUpload: parsed.runUpload
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
