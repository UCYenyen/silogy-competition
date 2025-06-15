import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '../../lib/prisma'

export async function GET() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('user_id')?.value

  if (!userId) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const user = await prisma.users.findUnique({
    where: { user_id: Number(userId) }
  })

  if (!user) {
    return NextResponse.json({ user: null }, { status: 404 })
  }

  // Don't send password hash to client
  const { password_hash, ...safeUser } = user

  return NextResponse.json({ user: safeUser })
}