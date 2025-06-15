import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '../../lib/prisma'

// Helper to check if user is admin staff
async function isAdmin(user_id: number) {
  const staff = await prisma.staff.findUnique({
    where: { user_id },
    include: { role: true }
  })
  return staff && staff.role.role_name === 'admin'
}

// GET: List all undecided quests (admin only)
async function getUndecidedQuestsForAdmin() {
  const cookieStore = await cookies()
  const userIdRaw = cookieStore.get('user_id')?.value
  if (!userIdRaw || !/^\d+$/.test(userIdRaw)) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  const user_id = parseInt(userIdRaw, 10)
  if (!(await isAdmin(user_id))) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }
  try {
    const quests = await prisma.quests.findMany({
      where: { status: 'undecided' }, // <-- Use the correct field name from your schema
      orderBy: { created_at: 'desc' }
    })
    return NextResponse.json({ quests })
  } catch (error) {
    console.error('Failed to fetch quests:', error)
    return NextResponse.json({ error: 'Failed to fetch quests', details: String(error) }, { status: 500 })
  }
}

// POST: Accept or decline a quest (admin only)
async function acceptOrDeclineQuest(req: Request) {
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
  try {
    const quest = await prisma.quests.update({
      where: { quest_id },
      data: { status: action } // <-- Use the correct field name from your schema
    })
    return NextResponse.json({ quest })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update quest', details: String(error) }, { status: 500 })
  }
}

// POST: Create a new quest
export async function POST(req: Request) {
  try {
    const cookieStore = cookies()
    const userIdRaw = cookieStore.get('user_id')?.value
    if (!userIdRaw || isNaN(Number(userIdRaw))) {
      return NextResponse.json({ error: 'Not authenticated or invalid user_id' }, { status: 401 })
    }
    const requester_id = Number(userIdRaw)

    const { title, description, location, urgency_level, due_date } = await req.json()
    if (!title || !description || !location || !urgency_level) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const allowedUrgency = ['Low', 'Medium', 'High', 'Urgent']
    if (!allowedUrgency.includes(urgency_level)) {
      return NextResponse.json({ error: 'Invalid urgency_level' }, { status: 400 })
    }

    const quest = await prisma.quests.create({
      data: {
        requester_id,
        title,
        description,
        location,
        urgency_level,
        due_date: due_date ? new Date(due_date) : null,
        confirmation_status: 'undecided',
      }
    })
    return NextResponse.json({ quest })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create quest', details: String(error) }, { status: 500 })
  }
}

// GET: List all accepted quests
export async function GET(req: NextRequest) {
  const userOnly = req.nextUrl.searchParams.get('userOnly')
  const cookieStore = cookies()
  const userIdRaw = cookieStore.get('user_id')?.value
  let where: any = { confirmation_status: 'accepted' }
  if (userOnly && userIdRaw && !isNaN(Number(userIdRaw))) {
    where = { requester_id: Number(userIdRaw) }
  }
  const quests = await prisma.quests.findMany({
    where,
    orderBy: { created_at: 'desc' }
  })
  return NextResponse.json({ quests })
}