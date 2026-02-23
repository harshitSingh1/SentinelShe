import { prisma } from './client'

export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | null = null
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error: any) {
      lastError = error
      
      // If it's a connection error, wait and retry
      if (error.code === 'P2024' || error.message.includes('connection')) {
        console.log(`Connection attempt ${i + 1} failed, retrying in ${delay}ms...`)
        await new Promise(resolve => setTimeout(resolve, delay))
        delay *= 2 // Exponential backoff
        continue
      }
      
      // If it's another error, throw immediately
      throw error
    }
  }
  
  throw lastError || new Error('Operation failed after retries')
}

// Usage example in your API route:
// const user = await withRetry(() => prisma.user.findUnique({ where: { email } }))