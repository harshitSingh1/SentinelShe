// src/lib/db/wake.ts
import { prisma } from './client'

export async function wakeDatabase() {
  try {
    // Simple query to wake up the database
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database is awake')
  } catch (error) {
    console.log('⏳ Waking database...')
    // Wait a moment for the database to wake up
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
}