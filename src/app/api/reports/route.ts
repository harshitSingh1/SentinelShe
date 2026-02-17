import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

// This will persist across API calls but reset on server restart
// In production, use a real database
let reports: any[] = []

// GET handler - Fetch reports
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = parseInt(searchParams.get('radius') || '10')

    let filteredReports = [...reports]

    // Filter by location if coordinates provided
    if (lat && lng) {
      filteredReports = filteredReports.filter(report => {
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

    // Sort by date (newest first) and limit
    filteredReports.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    filteredReports = filteredReports.slice(0, limit)

    return NextResponse.json({ 
      success: true, 
      reports: filteredReports,
      total: filteredReports.length
    })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}

// POST handler - Create new report
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
    
    // Validate required fields
    if (!body.title || !body.description || !body.category || !body.location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new report with default votes at 0
    const newReport = {
      id: Date.now().toString(),
      userId: session.user?.email,
      title: body.title,
      description: body.description,
      category: body.category,
      location: body.location,
      latitude: body.latitude || null,
      longitude: body.longitude || null,
      incidentDate: body.incidentDate || new Date().toISOString(),
      isAnonymous: body.isAnonymous || false,
      isVerified: false,
      status: 'PENDING',
      mediaUrls: [],
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date().toISOString(),
      user: {
        name: body.isAnonymous ? null : session.user?.name,
        isAnonymous: body.isAnonymous || false
      }
    }

    // Save to reports array
    reports.unshift(newReport)

    return NextResponse.json({ 
      success: true, 
      message: 'Report submitted successfully',
      report: newReport 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating report:', error)
    return NextResponse.json(
      { error: 'Failed to submit report' },
      { status: 500 }
    )
  }
}

// Helper function to calculate distance between two coordinates (in km)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371
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