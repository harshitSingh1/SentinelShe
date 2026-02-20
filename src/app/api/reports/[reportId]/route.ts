import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db/client'

interface RouteProps {
  params: Promise<{
    reportId: string
  }>
}

export async function GET(
  request: Request,
  { params }: RouteProps
) {
  try {
    const { reportId } = await params

    const report = await prisma.report.findUnique({
      where: { id: reportId },
      include: {
        user: {
          select: {
            name: true,
            isAnonymous: true,
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
      },
    })

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ report })
  } catch (error) {
    console.error('Error fetching report:', error)
    return NextResponse.json(
      { error: 'Failed to fetch report' },
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

    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      )
    }

    const { reportId } = await params
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
        await prisma.report.update({
          where: { id: reportId },
          data: { upvotes: { increment: 1 } },
        })
        break

      case 'verify':
        // Only moderators can verify
        if (user.role !== 'MODERATOR' && user.role !== 'ADMIN') {
          return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 403 }
          )
        }
        await prisma.report.update({
          where: { id: reportId },
          data: { isVerified: true, status: 'VERIFIED' },
        })
        break

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    // Get updated report
    const updatedReport = await prisma.report.findUnique({
      where: { id: reportId },
    })

    return NextResponse.json({ report: updatedReport })
  } catch (error) {
    console.error('Error updating report:', error)
    return NextResponse.json(
      { error: 'Failed to update report' },
      { status: 500 }
    )
  }
}