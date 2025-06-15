import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '../../lib/prisma'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const userIdRaw = cookieStore.get('user_id')?.value

    // Validate user_id
    if (!userIdRaw || isNaN(Number(userIdRaw))) {
      return NextResponse.json({ error: 'Not authenticated or invalid user_id' }, { status:401 })
    }
    const user_id = Number(userIdRaw)

    // Always create a new staff row for this user
    // If a staff row already exists for this user, delete it first (to avoid unique constraint error)
    await prisma.staff.deleteMany({ where: { user_id } })

    // Create new staff row
    const staff = await prisma.staff.create({
      data: {
        user_id,
        role_id: 1, // or any default role_id you want
        bio: null,
      }
    })

    return NextResponse.json({ message: 'User promoted to staff', staff })
  } catch (error) {
    return NextResponse.json({ error: 'Promotion failed', details: String(error) }, { status: 500 })
  }
}