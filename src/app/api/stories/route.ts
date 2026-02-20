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

    // Show ALL stories - no approval needed
    const where: any = {}
    
    if (category && category !== 'all') {
      where.category = category
    }
    
    if (tag) {
      where.tags = {
        has: tag,
      }
    }

    // Get stories from database with ALL relations
    const stories = await prisma.story.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            isAnonymous: true,
            safetyScore: true,
            email: true,
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

    // Transform the data to match the expected format
    const transformedStories = stories.map(story => ({
      id: story.id,
      title: story.title,
      content: story.content,
      category: story.category,
      author: {
        name: story.user?.name || null,
        isAnonymous: story.isAnonymous,
        id: story.user?.email || story.userId,
      },
      upvotes: story.upvotes,
      comments: story._count?.comments || 0,
      createdAt: story.createdAt,
      tags: story.tags,
      views: story.views,
      savedBy: story._count?.savedBy || 0,
    }))

    // Get total count for pagination
    const total = await prisma.story.count({ where })

    return NextResponse.json({
      success: true,
      stories: transformedStories,
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
      { error: 'Failed to fetch stories', stories: [] },
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
    console.log('📝 Creating story:', body.title)
    
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

    // Create story in Supabase
    const story = await prisma.story.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        category: validatedData.category,
        isAnonymous: validatedData.isAnonymous,
        tags: validatedData.tags || [],
        userId: user.id,
        status: 'APPROVED',
        upvotes: 0,
        views: 0,
      },
      include: {
        user: {
          select: {
            name: true,
            isAnonymous: true,
            email: true,
          },
        },
      },
    })

    console.log(`✅ Story created with ID: ${story.id}`)

    // Increase user's safety score for sharing
    await prisma.user.update({
      where: { id: user.id },
      data: {
        safetyScore: {
          increment: 10,
        },
      },
    })

    // Transform the response
    const transformedStory = {
      id: story.id,
      title: story.title,
      content: story.content,
      category: story.category,
      author: {
        name: story.user?.name || null,
        isAnonymous: story.isAnonymous,
        id: story.user?.email || story.userId,
      },
      upvotes: story.upvotes,
      comments: 0,
      createdAt: story.createdAt,
      tags: story.tags,
      views: story.views,
      savedBy: 0,
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Story shared successfully!',
        story: transformedStory,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating story:', error)
    
    if (error instanceof z.ZodError) {
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