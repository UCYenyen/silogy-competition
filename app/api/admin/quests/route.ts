import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '../../../lib/prisma'

async function isAdmin(user_id: number) {
  const staff = await prisma.staff.findUnique({
    where: { user_id },
    include: { role: true }
  })
  return staff && staff.role.role_name === 'admin'
}

export async function GET() {
  const cookieStore = cookies()
  const userIdRaw = cookieStore.get('user_id')?.value
  if (!userIdRaw || isNaN(Number(userIdRaw))) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  const user_id = Number(userIdRaw)
  if (!(await isAdmin(user_id))) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }
  const quests = await prisma.quests.findMany({
    where: { confirmation_status: 'undecided' },
    orderBy: { created_at: 'desc' }
  })
  return NextResponse.json({ quests })
}

export async function POST(req: Request) {
  const cookieStore = cookies()
  const userIdRaw = cookieStore.get('user_id')?.value
  if (!userIdRaw || isNaN(Number(userIdRaw))) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  const user_id = Number(userIdRaw)
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
}