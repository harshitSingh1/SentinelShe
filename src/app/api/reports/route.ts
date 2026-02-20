import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db/client'
import { z } from 'zod'

const reportSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(2000),
  category: z.enum(['SUSPICIOUS_ACTIVITY', 'HARASSMENT', 'UNSAFE_CONDITION', 'ASSAULT', 'STALKING', 'OTHER']),
  incidentDate: z.string(),
  location: z.string().min(3),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  isAnonymous: z.boolean(),
})

export async function GET(request: Request) {
  try {
    const session = await getServerSession()
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = parseInt(searchParams.get('radius') || '10')
    const showAll = searchParams.get('all') === 'true'

    console.log('Fetching reports...') // Debug log

    // Build filter
    let where: any = {}

    // If not showing all and user is logged in, show verified + user's own pending
    if (!showAll && session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      })

      if (user) {
        where = {
          OR: [
            { status: 'VERIFIED' },
            { userId: user.id, status: 'PENDING' }
          ]
        }
      } else {
        where.status = 'VERIFIED'
      }
    } else if (!showAll) {
      // Public view - only verified reports
      where.status = 'VERIFIED'
    }

    console.log('Query where clause:', where) // Debug log

    // Get reports from database
    const reports = await prisma.report.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            isAnonymous: true,
          },
        },
        _count: {
          select: {
            flags: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    })

    console.log(`Found ${reports.length} reports`) // Debug log

    // Filter by location if coordinates provided
    let filteredReports = reports
    if (lat && lng) {
      filteredReports = reports.filter(report => {
        if (!report.latitude || !report.longitude) return false
        const distance = calculateDistance(
          parseFloat(lat),
          parseFloat(lng),
          report.latitude,
          report.longitude
        )
        return distance <= radius
      })
    }

    return NextResponse.json({
      success: true,
      reports: filteredReports,
      total: filteredReports.length,
    })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reports', reports: [] },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in to submit a report' },
        { status: 401 }
      )
    }

    const body = await request.json()
    console.log('Received report data:', body) // Debug log

    // Validate input
    const validatedData = reportSchema.parse(body)

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

    console.log('Creating report for user:', user.id) // Debug log

    // Create report
    const report = await prisma.report.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        incidentDate: new Date(validatedData.incidentDate),
        location: validatedData.location,
        latitude: validatedData.latitude || 0,
        longitude: validatedData.longitude || 0,
        isAnonymous: validatedData.isAnonymous,
        userId: user.id,
        status: 'PENDING',
        upvotes: 0,
      },
      include: {
        user: {
          select: {
            name: true,
            isAnonymous: true,
          },
        },
      },
    })

    console.log('Report created successfully:', report.id) // Debug log

    // Increase user's safety score for reporting
    await prisma.user.update({
      where: { id: user.id },
      data: {
        safetyScore: {
          increment: 15,
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Report submitted successfully and is pending review',
        report,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating report:', error)

    if (error instanceof z.ZodError) {
      const zodError: any = error
      const errorMessage = zodError.errors?.[0]?.message || 'Validation error'
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit report' },
      { status: 500 }
    )
  }
}

// Helper function to calculate distance between two coordinates (in km)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees: number) {
  return degrees * (Math.PI / 180)
}