import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '../../../lib/prisma'

// Helper to check if user is admin staff
async function isAdmin(user_id: number) {
  const staff = await prisma.staff.findUnique({
    where: { user_id },
    include: { role: true }
  })
  return staff && staff.role.role_name === 'admin'
}

// GET: List all undecided quests (admin only)
export async function GET() {
  try {
    const cookieStore = await cookies()
    const userIdRaw = cookieStore.get('user_id')?.value
    if (!userIdRaw || !/^\d+$/.test(userIdRaw)) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    const user_id = parseInt(userIdRaw, 10)
    if (!(await isAdmin(user_id))) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }
    const quests = await prisma.quests.findMany({
      where: { confirmation_status: 'undecided' },
      orderBy: { created_at: 'desc' }
    })
    return NextResponse.json({ quests })
  } catch (error) {
    console.error('Failed to fetch quests:', error)
    return NextResponse.json({ error: 'Failed to fetch quests', details: String(error) }, { status: 500 })
  }
}

// POST: Accept or decline a quest (admin only)
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const userIdRaw = cookieStore.get('user_id')?.value
    if (!userIdRaw || !/^\d+$/.test(userIdRaw)) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    const user_id = parseInt(userIdRaw, 10)
    if (!(await isAdmin(user_id))) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }
    const { quest_id, action } = await req.json()
    if (!quest_id || !['accepted', 'declined'].includes(action)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    let updateData: any = { confirmation_status: action }
    if (action === 'declined') {
      updateData.status = 'Cancelled'
    }
    const quest = await prisma.quests.update({
      where: { quest_id },
      data: updateData
    })
    return NextResponse.json({ quest })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update quest', details: String(error) }, { status: 500 })
  }
}