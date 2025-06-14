import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    console.log('API: Attempting to fetch staff from database...')
    
    const staff = await prisma.staff.findMany({
      include: {
        user: {
          select: {
            user_id: true,
            name: true,
            email: true,
            phone_number: true,
            created_at: true,
            updated_at: true
          }
        },
        role: {
          select: {
            role_id: true,
            role_name: true,
            description: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })
    
    console.log('API: Found staff:', staff.length)
    return NextResponse.json(staff)
    
  } catch (error) {
    console.error('API Error fetching staff:', error)
    return NextResponse.json(
      { error: 'Failed to fetch staff', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}