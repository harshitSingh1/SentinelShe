const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function keepAlive() {
  console.log('🔄 Keeping database alive...')
  try {
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database ping successful')
  } catch (error) {
    console.error('❌ Database ping failed:', error)
  } finally {
    // Run every 4 minutes (Neon sleeps after 5 minutes)
    setTimeout(keepAlive, 4 * 60 * 1000)
  }
}

keepAlive()