import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    console.log('=== USERS API START ===')
    console.log('Environment check:')
    console.log('- DATABASE_URL exists:', !!process.env.DATABASE_URL)
    console.log('- DIRECT_URL exists:', !!process.env.DIRECT_URL)
    
    // Test basic connection
    console.log('Testing database connection...')
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    // Try to fetch users (NO orderBy!)
    console.log('Fetching users...')
    const users = await prisma.users.findMany()
    
    console.log(`✅ Found ${users.length} users`)
    console.log('Users data:', JSON.stringify(users, null, 2))
    
    return NextResponse.json(users)
    
  } catch (error) {
    console.error('❌ API Error:', error)
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return NextResponse.json(
      { 
        error: 'Failed to fetch users',
        message: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.name : 'Unknown'
      },
      { status: 500 }
    )
  } finally {
    console.log('=== USERS API END ===')
    await prisma.$disconnect()
  }
}