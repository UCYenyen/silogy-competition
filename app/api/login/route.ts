import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    const user = await prisma.users.findUnique({ where: { email } })
    if (!user || user.password_hash !== password) {
      // In production, use hashed passwords!
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const res = NextResponse.json({ message: 'Login successful', user_id: user.user_id })
    res.cookies.set('user_id', String(user.user_id), {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
    return res
  } catch (error) {
    return NextResponse.json({ error: 'Login failed', details: String(error) }, { status: 500 })
  }
}