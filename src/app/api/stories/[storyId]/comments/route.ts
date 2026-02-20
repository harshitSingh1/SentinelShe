import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db/client'
import { z } from 'zod'

interface RouteProps {
  params: Promise<{
    storyId: string
  }>
}

const commentSchema = z.object({
  content: z.string().min(1).max(500),
})

export async function POST(
  request: Request,
  { params }: RouteProps
) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in to comment' },
        { status: 401 }
      )
    }

    const { storyId } = await params
    const body = await request.json()
    
    // Validate input
    const validatedData = commentSchema.parse(body)

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

    // Check if story exists
    const story = await prisma.story.findUnique({
      where: { id: storyId },
    })

    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      )
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content: validatedData.content,
        userId: user.id,
        storyId,
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

    // Transform comment
    const transformedComment = {
      id: comment.id,
      content: comment.content,
      author: {
        name: comment.user?.name || null,
        isAnonymous: comment.user?.isAnonymous || false,
        id: comment.user?.email || comment.userId,
      },
      createdAt: comment.createdAt,
      upvotes: 0,
    }

    return NextResponse.json(
      { 
        success: true, 
        comment: transformedComment,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating comment:', error)
    
    if (error instanceof z.ZodError) {
      const zodError: any = error
      const errorMessage = zodError.errors?.[0]?.message || 'Validation error'
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: Request,
  { params }: RouteProps
) {
  try {
    const { storyId } = await params

    const comments = await prisma.comment.findMany({
      where: { storyId },
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
    })

    // Transform comments
    const transformedComments = comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      author: {
        name: comment.user?.name || null,
        isAnonymous: comment.user?.isAnonymous || false,
        id: comment.user?.email || comment.userId,
      },
      createdAt: comment.createdAt,
      upvotes: 0,
    }))

    return NextResponse.json({ comments: transformedComments })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments', comments: [] },
      { status: 500 }
    )
  }
}