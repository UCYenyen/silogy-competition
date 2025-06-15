import { PrismaClient } from '../generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  // Fix connection pooling issues
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

// Disconnect and reconnect on each request in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Add connection management
export async function connectDB() {
  try {
    await prisma.$connect()
  } catch (error) {
    console.error('Failed to connect to database:', error)
    throw error
  }
}

export async function disconnectDB() {
  await prisma.$disconnect()
}