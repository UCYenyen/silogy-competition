import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(_req: Request, { params }: { params: { quest_id: string } }) {
  try {
    const { quest_id } = params
    if (!/^\d+$/.test(quest_id)) {
      return NextResponse.json({ error: 'Invalid quest ID' }, { status: 400 })
    }
    const quest = await prisma.quests.findUnique({
      where: { quest_id: parseInt(quest_id, 10) }
    })
    if (!quest) {
      return NextResponse.json({ error: 'Quest not found' }, { status: 404 })
    }
    return NextResponse.json({ quest })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quest', details: String(error) }, { status: 500 })
  }
}