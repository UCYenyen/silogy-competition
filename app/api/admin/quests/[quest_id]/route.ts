import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { quest_id: string } }
) {
  const questId = params.quest_id;
  if (!/^\d+$/.test(questId)) {
    return NextResponse.json({ error: 'Invalid quest ID' }, { status: 400 });
  }
  const quest = await prisma.quests.findUnique({
    where: { quest_id: parseInt(questId, 10) }
  });
  if (!quest) {
    return NextResponse.json({ error: 'Quest not found' }, { status: 404 });
  }
  return NextResponse.json({ quest });
}