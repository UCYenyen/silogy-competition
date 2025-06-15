import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '../../../lib/prisma'

// Helper to check if user is staff (but not admin)
async function isStaff(user_id: number) {
  const staff = await prisma.staff.findUnique({
    where: { user_id },
    include: { role: true }
  });
  return staff && staff.role.role_name !== 'admin';
}

// GET: List all accepted quests that are not ongoing or completed
export async function GET() {
  const cookieStore = await cookies();
  const userIdRaw = cookieStore.get('user_id')?.value;
  if (!userIdRaw || !/^\d+$/.test(userIdRaw)) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const user_id = parseInt(userIdRaw, 10);
  if (!(await isStaff(user_id))) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }
  const quests = await prisma.quests.findMany({
    where: {
      confirmation_status: 'accepted',
      status: { in: ['Open'] }
    },
    orderBy: { created_at: 'desc' }
  });
  return NextResponse.json({ quests });
}

// POST: Staff takes a quest
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const userIdRaw = cookieStore.get('user_id')?.value;
  if (!userIdRaw || !/^\d+$/.test(userIdRaw)) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const user_id = parseInt(userIdRaw, 10);
  if (!(await isStaff(user_id))) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }
  const { quest_id } = await req.json();
  if (!quest_id) {
    return NextResponse.json({ error: 'Missing quest_id' }, { status: 400 });
  }

  // Check if already taken
  const existing = await prisma.user_quests.findFirst({
    where: { user_id, quest_id }
  });
  if (existing) {
    return NextResponse.json({ error: 'You have already taken this quest' }, { status: 400 });
  }

  // Add to user_quests and set quest status to Ongoing
  await prisma.user_quests.create({
    data: {
      user_id,
      quest_id,
      status: 'Accepted'
    }
  });
  await prisma.quests.update({
    where: { quest_id },
    data: { status: 'Ongoing' }
  });
  return NextResponse.json({ message: 'Quest taken' });
}