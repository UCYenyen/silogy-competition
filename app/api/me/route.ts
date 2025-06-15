import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '../../lib/prisma'

export async function GET() {
  const cookieStore = cookies()
  const userIdRaw = cookieStore.get('user_id')?.value

  if (!userIdRaw || isNaN(Number(userIdRaw))) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const user = await prisma.users.findUnique({
    where: { user_id: Number(userIdRaw) }
  })

  if (!user) {
    return NextResponse.json({ user: null }, { status: 404 })
  }

  const { password_hash, ...safeUser } = user
  return NextResponse.json({ user: safeUser })
}