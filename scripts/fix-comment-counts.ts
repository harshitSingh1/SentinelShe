import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Fixing comment counts...')
  
  // Get all stories
  const stories = await prisma.story.findMany({
    include: {
      _count: {
        select: { comments: true }
      }
    }
  })
  
  for (const story of stories) {
    console.log(`Story ${story.id}: ${story._count.comments} comments`)
  }
  
  console.log('Done!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())