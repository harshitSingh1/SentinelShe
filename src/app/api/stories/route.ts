import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db/client'
import { z } from 'zod'

const storySchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(50).max(5000),
  category: z.enum(['PERSONAL_EXPERIENCE', 'SAFETY_TIP', 'AWARENESS', 'SUCCESS_STORY', 'QUESTION']),
  isAnonymous: z.boolean(),
  tags: z.array(z.string()).optional(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Build filter - For testing, show all stories including pending
    const where: any = {}
    
    if (category) {
      where.category = category
    }
    
    if (tag) {
      where.tags = {
        has: tag,
      }
    }

    // Get stories with pagination
    const stories = await prisma.story.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            isAnonymous: true,
            safetyScore: true,
          },
        },
        _count: {
          select: {
            comments: true,
            savedBy: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    })

    // Get total count for pagination
    const total = await prisma.story.count({ where })

    return NextResponse.json({
      stories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching stories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in to share a story' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate input
    const validatedData = storySchema.parse(body)

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create story
    const story = await prisma.story.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        category: validatedData.category,
        isAnonymous: validatedData.isAnonymous,
        tags: validatedData.tags || [],
        userId: user.id,
        status: 'PENDING', // Needs moderation
      },
    })

    // Increase user's safety score for sharing
    await prisma.user.update({
      where: { id: user.id },
      data: {
        safetyScore: {
          increment: 10,
        },
      },
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Story submitted successfully and is pending review',
        story,
      },
      { status: 201 }
    )
    } catch (error) {
    console.error('Error creating story:', error)
    
    if (error instanceof z.ZodError) {
      // Fix the TypeScript error by using any type assertion
      const zodError: any = error
      const errorMessage = zodError.errors?.[0]?.message || 'Validation error'
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create story' },
      { status: 500 }
    )
  }
}