import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

export async function GET() {
  try {
    // Test connection
    await prisma.$connect()
    
    // Get counts
    const userCount = await prisma.user.count()
    const reportCount = await prisma.report.count()
    const storyCount = await prisma.story.count()
    
    // Get sample data
    const recentReports = await prisma.report.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    })
    
    const recentStories = await prisma.story.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    })

    return NextResponse.json({
      success: true,
      database: '✅ Connected to Supabase',
      stats: {
        users: userCount,
        reports: reportCount,
        stories: storyCount
      },
      recentReports: recentReports.map(r => ({
        id: r.id,
        title: r.title,
        status: r.status,
        createdAt: r.createdAt
      })),
      recentStories: recentStories.map(s => ({
        id: s.id,
        title: s.title,
        status: s.status,
        createdAt: s.createdAt
      }))
    })
  } catch (error) {
    console.error('Database connection failed:', error)
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 })
  }
}