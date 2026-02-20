import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db/client'
import { z } from 'zod'

interface RouteProps {
  params: Promise<{
    storyId: string
  }>
}

const updateStorySchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(50).max(5000),
  category: z.enum(['PERSONAL_EXPERIENCE', 'SAFETY_TIP', 'AWARENESS', 'SUCCESS_STORY', 'QUESTION']),
  isAnonymous: z.boolean(),
  tags: z.array(z.string()).optional(),
})

export async function GET(
  request: Request,
  { params }: RouteProps
) {
  try {
    const { storyId } = await params

    const story = await prisma.story.findUnique({
      where: { id: storyId },
      include: {
        user: {
          select: {
            name: true,
            isAnonymous: true,
            safetyScore: true,
            email: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                name: true,
                isAnonymous: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            savedBy: true,
          },
        },
      },
    })

    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      )
    }

    // Transform comments
    const commentsList = story.comments ? story.comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      author: {
        name: comment.user?.name || null,
        isAnonymous: comment.user?.isAnonymous || false,
        id: comment.user?.email || comment.userId,
      },
      createdAt: comment.createdAt,
      upvotes: 0,
    })) : []

    // Transform story
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
      comments: commentsList.length,
      createdAt: story.createdAt,
      tags: story.tags,
      views: story.views,
      savedBy: story._count?.savedBy || 0,
      commentsList: commentsList,
    }

    return NextResponse.json({ story: transformedStory })
  } catch (error) {
    console.error('Error fetching story:', error)
    return NextResponse.json(
      { error: 'Failed to fetch story' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: RouteProps
) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { storyId } = await params
    const body = await request.json()

    // Validate input
    const validatedData = updateStorySchema.parse(body)

    // Find the story to check ownership
    const story = await prisma.story.findUnique({
      where: { id: storyId },
      include: { user: true }
    })

    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      )
    }

    // Check if user owns the story
    if (story.user.email !== session.user?.email) {
      return NextResponse.json(
        { error: 'You can only edit your own stories' },
        { status: 403 }
      )
    }

    // Update the story
    const updatedStory = await prisma.story.update({
      where: { id: storyId },
      data: {
        title: validatedData.title,
        content: validatedData.content,
        category: validatedData.category,
        isAnonymous: validatedData.isAnonymous,
        tags: validatedData.tags || [],
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

    return NextResponse.json({ 
      success: true, 
      story: updatedStory 
    })
  } catch (error) {
    console.error('Error updating story:', error)
    
    if (error instanceof z.ZodError) {
      const zodError: any = error
      const errorMessage = zodError.errors?.[0]?.message || 'Validation error'
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update story' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: RouteProps
) {
  try {
    const session = await getServerSession()
    const { storyId } = await params
    const { action, change } = await request.json()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    switch (action) {
      case 'upvote':
        await prisma.story.update({
          where: { id: storyId },
          data: { upvotes: { increment: change || 1 } },
        })
        break

      case 'view':
        await prisma.story.update({
          where: { id: storyId },
          data: { views: { increment: 1 } },
        })
        break

      case 'save':
        // For save, we need a SavedStory model
        // This is a placeholder - implement based on your schema
        break

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating story:', error)
    return NextResponse.json(
      { error: 'Failed to update story' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteProps
) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { storyId } = await params

    // Find the story to check ownership
    const story = await prisma.story.findUnique({
      where: { id: storyId },
      include: { user: true }
    })

    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      )
    }

    // Check if user owns the story
    if (story.user.email !== session.user?.email) {
      return NextResponse.json(
        { error: 'You can only delete your own stories' },
        { status: 403 }
      )
    }

    // Delete all comments first
    await prisma.comment.deleteMany({
      where: { storyId },
    })

    // Delete the story
    await prisma.story.delete({
      where: { id: storyId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting story:', error)
    return NextResponse.json(
      { error: 'Failed to delete story' },
      { status: 500 }
    )
  }
}