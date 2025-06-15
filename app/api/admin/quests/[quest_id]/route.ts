import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma.ts'

export async function GET(req: NextRequest) {
  // Extract id from the URL
  const urlParts = req.nextUrl.pathname.split('/');
  const questId = urlParts[urlParts.length - 1];

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