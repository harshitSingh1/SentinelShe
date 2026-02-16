import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db/client'

interface RouteProps {
  params: Promise<{
    storyId: string
  }>
}

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
          },
        },
        comments: {
          include: {
            user: {
              select: {
                name: true,
                isAnonymous: true,
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

    // Increment view count
    await prisma.story.update({
      where: { id: storyId },
      data: {
        views: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({ story })
  } catch (error) {
    console.error('Error fetching story:', error)
    return NextResponse.json(
      { error: 'Failed to fetch story' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: RouteProps
) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      )
    }

    const { storyId } = await params
    const { action } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    switch (action) {
      case 'upvote':
        // For upvotes, we'll just increment the upvote count without using flags
        // This is a simplified approach - you can implement a proper upvote system later
        await prisma.story.update({
          where: { id: storyId },
          data: { upvotes: { increment: 1 } },
        })
        break

      case 'save':
        const existingSave = await prisma.savedStory.findUnique({
          where: {
            userId_storyId: {
              userId: user.id,
              storyId,
            },
          },
        })

        if (existingSave) {
          await prisma.savedStory.delete({
            where: { id: existingSave.id },
          })
        } else {
          await prisma.savedStory.create({
            data: {
              userId: user.id,
              storyId,
            },
          })
        }
        break

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    // Get updated story
    const updatedStory = await prisma.story.findUnique({
      where: { id: storyId },
      include: {
        _count: {
          select: {
            savedBy: true,
          },
        },
      },
    })

    return NextResponse.json({ story: updatedStory })
  } catch (error) {
    console.error('Error updating story:', error)
    return NextResponse.json(
      { error: 'Failed to update story' },
      { status: 500 }
    )
  }
}