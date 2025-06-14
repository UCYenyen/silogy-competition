import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function POST(req: Request) {
  try {
    const { name, email, phone_number, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if email already exists
    const existing = await prisma.users.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    // For demo: store password as plain text (not secure!)
    // In production, hash the password!
    const user = await prisma.users.create({
      data: {
        name,
        email,
        phone_number,
        password_hash: password,
      },
    })

    return NextResponse.json({ user_id: user.user_id, name: user.name, email: user.email })
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed', details: String(error) }, { status: 500 })
  }
}