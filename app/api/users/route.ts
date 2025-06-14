import { NextResponse } from 'next/server'
  import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    console.log('API: Attempting to fetch users from database...')
    
    const users = await prisma.users.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })
    
    console.log('API: Found users:', users.length)
    return NextResponse.json(users)
    
  } catch (error) {
    console.error('API Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}